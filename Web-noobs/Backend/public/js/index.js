/* eslint-disable */

import "@babel/polyfill";
import { createNewQuery } from "./createQuery";
import { login, logout } from "./login";
import { signup } from "./signup";
import { deleteThisQuery } from "./deleteQuery";
import { deleteThisUser } from "./deleteUser";

//DOM

const loginForm = document.querySelector(".form----login");
const signupForm = document.querySelector(".form1");
const logOutBtn = document.querySelector(".logOut");
const createQueryForm = document.querySelector(".form-create");
const deleteQueryForm = document.querySelector(".form-delete");
const deleteUserForm = document.querySelector(".form-deleteUser");

//Values

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password1").value;
    signup(name, email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (createQueryForm)
  createQueryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("Eventname").value;
    const query = document.getElementById("Eventduration").value;
    const branch = document.getElementById("Eventteam").value;
    const tags = document.getElementById("Eventprice").value;
    createNewQuery(title, query, branch, tags);
  });

if (deleteQueryForm)
  deleteQueryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("Eventid").value;
    deleteThisQuery(id);
  });

if (deleteUserForm)
  deleteUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("Userid").value;
    deleteThisUser(id);
  });
