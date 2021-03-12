<?php
/**
 * @package EvolutionScript
 * @author: EvolutionScript S.A.C.
 * @Copyright (c) 2010 - 2020, EvolutionScript.com
 * @link http://www.evolutionscript.com
 */

namespace App\Controllers\Api;


use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Psr\Log\LoggerInterface;

class Tickets extends ResourceController
{
    protected $format = 'json';
    protected $modelName = 'App\Models\Tickets';
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        parent::initController($request, $response, $logger); // TODO: Change the autogenerated stub
        helper(['form','html','helpdesk','number','filesystem','text']);
    }

    public function create()
    {
        $api = Services::api();
        if(!$api->validatePermission('tickets/create')){
            return $api->showError();
        }

        $settings = Services::settings();
        $validation = Services::validation();
        $tickets = Services::tickets();
        $attachments = Services::attachments();
        $validation->setRule('opener','opener','required|in_list[user,staff]',[
            'required' => lang('Api.error.openerMissing'),
            'in_list' => lang('Api.error.openerInvalid')
        ]);
        $validation->setRule('user_id','user_id', 'required|is_natural_no_zero|is_not_unique[users.id]',[
            'required' => lang('Api.error.userIdMissing'),
            'is_natural_no_zero' => lang('Api.error.userIdNotValid'),
            'is_not_unique' => lang('Api.error.userIdNotFound')
        ]);

        if($this->request->getPost('opener') == 'staff'){
            $validation->setRule('staff_id', 'staff_id', 'required|is_natural_no_zero|is_not_unique[staff.id,staff.active,1]',[
                'required' => lang('Api.error.staffIdMissing'),
                'is_natural_no_zero' => lang('Api.error.staffIdNotValid'),
                'is_not_unique' => lang('Api.error.staffIdNotFound')
            ]);
        }

        $validation->setRule('department_id','department_id', 'required|is_natural_no_zero|is_not_unique[departments.id]', [
            'required' => lang('Api.error.departmentIdMissing'),
            'is_natural_no_zero' => lang('Api.error.departmentIdNotValid'),
            'is_not_unique' => lang('Api.error.departmentIdNotFound')
        ]);
        $validation->setRule('subject','subject','required',[
            'required' => lang('Api.error.subjectMissing')
        ]);
        $validation->setRule('body','body','required',[
            'required' => lang('Api.error.bodyMissing')
        ]);
        if($settings->config('ticket_attachment')){
            $max_size = $settings->config('ticket_file_size')*1024;
            $allowed_extensions = unserialize($settings->config('ticket_file_type'));
            $allowed_extensions = implode(',', $allowed_extensions);
            $validation->setRule('attachment', 'attachment', 'ext_in[attachment,'.$allowed_extensions.']|max_size[attachment,'.$max_size.']',[
                'ext_in' => lang('Api.error.fileNotAllowed'),
                'max_size' => lang_replace('Api.error.fileIsBig', ['%size%' => number_to_size($max_size*1024, 2)])
            ]);
        }
        if($validation->withRequest($this->request)->run() == false){
            return $api->output(implode(' ',array_values($validation->getErrors())), true);
        }
        if ($settings->config('ticket_attachment')) {
            if ($files_uploaded = $attachments->ticketUpload()) {
                $files = $files_uploaded;
            }
        }

        $ticket_id = $tickets->createTicket($this->request->getPost('user_id'), $this->request->getPost('subject'), $this->request->getPost('department_id'));
        $staff_id = ($this->request->getPost('opener') == 'staff') ? $this->request->getPost('staff_id') : 0;
        $message = $tickets->purifyHTML($this->request->getPost('body'));
        $message_id = $tickets->addMessage($ticket_id, $message, $staff_id, false);
        if (isset($files)) {
            $attachments->addTicketFiles($ticket_id, $message_id, $files);
        }
        $ticket = $tickets->getTicket(['id' => $ticket_id]);
        if($this->request->getPost('notify') == '1'){
            $tickets->newTicketNotification($ticket);
        }
        if($staff_id > 0){
            $tickets->updateTicket([
                'last_replier' => $staff_id
            ], $ticket_id);
            $tickets->replyTicketNotification($ticket, $message, (isset($files) ? $files : null));
        }
        return $api->output(['ticket_id' => $ticket_id, 'message' => lang('Api.ticketCreated')]);
    }

    public function index()
    {
        $api = Services::api();
        if(!$api->validatePermission('tickets/read')){
            return $api->showError();
        }

        $page = (is_numeric($this->request->getGet('page')) ? $this->request->getGet('page') : 1);
        if($page <= 0 || $page != round($page)){
            return $api->output(lang('Api.error.pageNotFound'), true);
        }
        if(is_numeric($this->request->getGet('status'))){
            $tickets = Services::tickets();
            if(!array_key_exists($this->request->getGet('status'),$tickets->statusList())){
                return $api->output(lang('Api.error.statusIdNotValid'), true);
            }
            $this->model->where('tickets.status', $this->request->getGet('status'));
        }
        if(is_numeric($this->request->getGet('user_id'))){
            $this->model->where('tickets.user_id', $this->request->getGet('user_id'));
        }
        if(is_numeric($this->request->getGet('department_id'))){
            $this->model->where('tickets.department_id', $this->request->getGet('department_id'));
        }
        $settings = Services::settings();
        $result = $this->model->select('tickets.id, tickets.user_id, tickets.department_id, tickets.subject, 
        tickets.date, tickets.last_update, tickets.status, tickets.replies, users.fullname as user_fullname, 
        departments.name as department_name')
            ->join('users', 'users.id=tickets.user_id')
            ->join('departments', 'departments.id=tickets.department_id')
            ->paginate($settings->config('tickets_page'), 'default', $page);
        $pager = $this->model->pager;
        return $api->output([
            'total_tickets' => $pager->getDetails()['total'],
            'pages' => $pager->getLastPage(),
            'tickets' => $result
        ]);
    }

    public function show($id = null)
    {
        $api = Services::api();
        if(!$api->validatePermission('tickets/read')){
            return $api->showError();
        }

        $result = $this->model->select('tickets.id, tickets.user_id, tickets.department_id, tickets.subject, 
        tickets.date, tickets.last_update, tickets.status, tickets.replies, users.fullname as user_fullname, 
        departments.name as department_name')
            ->join('users', 'users.id=tickets.user_id')
            ->join('departments', 'departments.id=tickets.department_id')
            ->find($id);
        if(!$result){
            return $api->output(lang('Api.error.ticketNotFound'), true);
        }else{
            return $api->output(['ticket' => $result]);
        }
    }

    public function update($id = null)
    {
        $api = Services::api();
        if(!$api->validatePermission('tickets/update')){
            return $api->showError();
        }

        $tickets = Services::tickets();
        if(!$ticket = $tickets->getTicket(['id' => $id])){
            return $api->output(lang('Api.error.ticketNotFound'), true);
        }

        $validation = Services::validation();
        $department_id = $ticket->department_id;
        $status = $ticket->status;
        $update = false;
        if($this->request->getPost('department_id')){
            $update = true;
            $validation->setRule('department_id','department_id', 'is_natural_no_zero|is_not_unique[departments.id]',[
                'is_natural_no_zero' => lang('Api.error.departmentIdNotValid'),
                'is_not_unique' => lang('Api.error.departmentIdNotFound')
            ]);
            $department_id = $this->request->getPost('department_id');
        }
        if($this->request->getPost('status')){
            $update = true;
            $validation->setRule('status','status', 'is_natural_no_zero|in_list['.implode(',', array_keys($tickets->statusList())).']',[
                'is_natural_no_zero' => lang('Api.error.statusIdNotValid'),
                'in_list' => lang('Api.error.statusIdNotValid')
            ]);
            $status = $this->request->getPost('status');
        }

        if(!$update){
            return $api->output(lang('Api.ticketUpdated'));
        }elseif ($validation->withRequest($this->request)->run() == false){
            return $api->output(implode(' ', array_values($validation->getErrors())), true);
        }else{
            $tickets->updateTicket([
                'department_id' => $department_id,
                'status' => $status
            ], $ticket->id);
            return $api->output(lang('Api.ticketUpdated'));
        }
    }

    public function delete($id = null)
    {
        $api = Services::api();
        if(!$api->validatePermission('tickets/delete')){
            return $api->showError();
        }

        $tickets = Services::tickets();
        if(!$ticket = $tickets->getTicket(['id' => $id])){
            return $api->output(lang('Api.error.ticketNotFound'), true);
        }
        $tickets->deleteTicket($id);
        return $api->output(lang('Api.ticketRemoved'));
    }
}