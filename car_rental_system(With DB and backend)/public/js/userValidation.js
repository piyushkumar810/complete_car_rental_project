const form = document.querySelector("form");
const submit_btn = document.querySelector(".btn");
const email = document.querySelector(".email");
const contact = document.querySelector("#Contact");
const password = document.querySelector(".pass");
submit_btn.onclick = (e) => {
  e.preventDefault();

  // *************  Contact Validation

  if ((contact.value).length != 10) {
    alert("Phone Number must be of 10 digit");
  }

  if (password.length < 8) {
    alert("Password Must Contain 8 digit");
  }

}