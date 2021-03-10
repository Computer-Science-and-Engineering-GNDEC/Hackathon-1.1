## Hackathon1.1

## Problem Statements

You need to use existing FOSS to provide solution. Any new solution from scratch (not based on existing FOSS) should need a justification. All work will have Open Source License (to be decided by Organisers) and all the code needed to be on some public version control system. Every team needs to post their progress every hour.

Problem might be big and small. Your total achievement / contribution will be considered. If you are able to solve one problem, you may take a second one. If you are working on a big project, your milestones will be considered. So, better define your small goals, from a big project.

Background material is only suggestive, you may search for better or similar FOSS alternatives. Before use of any such software, teams need to ensure that license of that software meets the requirements of Hackathon1.0

All demonstration shall be on Linux Server provided by college

## Suggested Problem Statements

### Help Desk

1. Create a help desk which allow the user to post his/her queries regarding college. 
2. The help desk should provide ldap login to the user along with guest login(where the user have to register) the user have to provide the tag for his/her query along with the concern department to whom the query belongs. 
3. The help desk should have an admin panel where the admin can see all the queries rased by the users. 
4. Authorized person of concerned department forward the query to concerned person and HoD can see all the queries raised to their department 
5. HoD  can also forward the query to the concerned teacher. 
6. All the queries and their solutions will not be directly posted to fornt page of  the Helpdesk only the queries approved by HOD or admin will be posted as FAQ on help desk portal. 
7. You can use open source  softwares like  [helpy](helpy.io), [uvdesk](https://www.uvdesk.com/en/),[osticket](https://osticket.com), [erpnext](https://github.com/frappe/erpnext), or any of your choice.


### Live Feed from Proctoring through Moodle

The [Current System](https://moodle.org/plugins/quizaccess_proctoring) stores the photograph of the student appear in examination every 30 seconds and store it on the backend.

Features Required for the proposed system:

1. Live feed of students appearing exam in  the ivigilator. 
2. At a time live feed can contain set of 25 to 30 students to each invigilator. 
3. Pin the live feed of the selected students.
 
### App(Cross Platform) for Examination

To Create an app for the the conduct of examination in a proctored way.

#### Features

Following Features Need to be implemented and provided

- Authentication system for making student login using LDAP by taking the following permissions from the user. 
 
1. After accepting the terms and conditions user will not be able to use any application other than this app
2. He/She may not be able to close, minimize or change the size of window screen
3. Only WiFi and mobile data can be turned on, no other options such as Bluetooth etc can be turned on.
4. Calls and Notifications will be blocked.
  
- After login the user will be directed to the main page where exam can be conductes.
- Only the the services provided by exam brach will appear on the screen of device such as question papers, calcualtors, log tables, etc
- A portal for teacher for uploading question papers and to provide other tools required for exam such as calculator.

### Invigilator attendance system(PWA)

The motivation for this project is that an invigilator will able to mark attandene through mobile phone. Features expexted are as follows:

1. Face recognization to mark attendance.
2. Sheet number can be scan through QR code scanner inside that app to get sheet number.
3. Question paper number can be scan through QR code scanner inside that app to get question paper number.
4. There would be a manual attendance option available.
5. Examination room wise attendance list can be seen through superintendent login.
6. In admin pannel there can be an option to upload student list for specific eamimation centre(room wise).

### Multiple Websites is ERPNext

The motivation is to add a feature in ERPNext so that user can create a website for each department/company inside the ERP. The task is as follows:

1. Participants have to make website for college in considering GNDEC as main company inside ERPNext.
2. Transfer content content of [current](https://gndec.ac.in/) website into the newly created website.
3. Choose features that will best suite the reuuirements as given in [Hackathon 1.0](https://computer-science-and-engineering-gndec.github.io/Hackathon-1.0/) [problem statment](https://computer-science-and-engineering-gndec.github.io/Hackathon-1.0/problem.html)
4. Add a feature to ERPNext so that user may able to add a website to each child-company/derpatment from forntend.
5. Make websites of all departments using that feature.
6. Transfer the content of departmental websites.

### Document Management System
 
Demonstrating implementation of Document Management System for an Engineering College

Background information:
https://sourceforge.net/projects/seeddms/
https://github.com/openkm
https://frappe.io/blog/erpnext-features/a-document-management-system-within-erpnext 



