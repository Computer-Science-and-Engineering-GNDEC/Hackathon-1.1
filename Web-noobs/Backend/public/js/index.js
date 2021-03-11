/* eslint-disable */

import '@babel/polyfill';
import { createNewEvent } from './createEvent';
import { login, logout } from './login';
import { signup } from './signup';
import { deleteThisEvent } from './deleteEvent';
import { deleteThisUser } from './deleteUser';
import { forgotMyPassword } from './forgotPassword';
import { updateSettings } from './updateSettings';
import { ResetMyPassword } from './resetPassword';

//DOM

const loginForm = document.querySelector('.form----login');
const signupForm = document.querySelector('.form1');
const logOutBtn = document.querySelector('.logOut');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createEventForm = document.querySelector('.form-create');
const deleteEventForm = document.querySelector('.form-delete');
const deleteUserForm = document.querySelector('.form-deleteUser');
const forgotPasswordForm = document.querySelector('.form--forgot');
const resetPasswordForm = document.querySelector('.form--reset');

//Values

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password1').value;
    signup(name, email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password-account').textContent =
      'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password-account').textContent =
      'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (createEventForm)
  createEventForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('Eventname').value;
    const duration = document.getElementById('Eventduration').value;
    const team = document.getElementById('Eventteam').value;
    const price = document.getElementById('Eventprice').value;
    const StartDates = document.getElementById('EventStartDates').value;
    const description = document.getElementById('EventDescription').value;
    const link = document.getElementById('link').value;
    createNewEvent(name, duration, team, price, StartDates, description, link);
  });

if (deleteEventForm)
  deleteEventForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('Eventid').value;
    deleteThisEvent(id);
  });

if (deleteUserForm)
  deleteUserForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('Userid').value;
    deleteThisUser(id);
  });
if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotMyPassword(email);
  });
if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const tok = document.getElementById('token').value;
    ResetMyPassword(password, passwordConfirm, tok);
  });
