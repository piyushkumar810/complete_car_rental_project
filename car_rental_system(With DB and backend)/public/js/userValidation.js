
// ******************** Name Validation ************************

let full_name = document.getElementById("FullName");
let full_name_Error = document.querySelector(".name_small");

full_name.oninput = () => {
  let dynamic_Input = full_name.value;
  if (dynamic_Input.length == 0) {
    full_name.classList.add("Error-Input");
    full_name_Error.innerText = "Name can't be empty";
  } else {
    let isValid = true;
    for (let i = 0; i < dynamic_Input.length; i++) {
      let charCode = dynamic_Input[i].charCodeAt(0);
      if (!((charCode >= 65 && charCode <= 90) ||  // Uppercase letters A-Z
        (charCode >= 97 && charCode <= 122) || // Lowercase letters a-z
        charCode == 32)) {                     // Space
        isValid = false;
        break;
      }
    }
    if (isValid) {
      full_name.classList.remove("Error-Input");
      full_name_Error.innerText = "";
    } else {
      full_name.classList.add("Error-Input");
      full_name_Error.innerText = "Name will contain only Alphabetic Characters";
    }
  }
};



//   *******************  Contact Number Valiation *******************

let contact_Number = document.getElementById("Contact-Number");
let contact_Number_Error = document.getElementById("Mobile-Number-Small");

contact_Number.oninput = () => {
  if (contact_Number.value.length == 0) {
    contact_Number.classList.add("Error-Input");
    contact_Number_Error.innerText = "Phone Number Can't be empty";
  }
  else {

    if ((contact_Number.value).length == 10) {
      contact_Number.classList.remove("Error-Input");
      contact_Number_Error.innerText = "";
    }
    else {
      contact_Number.classList.add("Error-Input");
      contact_Number_Error.innerText = "Please Enter 10 digit mobile number";
    }

  }
}
//    *******************  Email-Validation   ***********************


let email_Id = document.getElementById("Email-Id");
let email_Error = document.getElementById("Email-Small")
email_Id.oninput = () => {
  let dynamic_Input = email_Id.value;
  if (dynamic_Input.length == 0) {
    email_Id.classList.add("Error-Input");
    email_Error.innerText = "Email can't be empty";
  }
  else {
    if (dynamic_Input.endsWith("@gmail.com") || dynamic_Input.endsWith("@yahoo.com") || dynamic_Input.endsWith("@outlook.com") || dynamic_Input.endsWith("@gmx.com") || dynamic_Input.endsWith("@iCloud.com")) {
      email_Id.classList.remove("Error-Input");
      email_Error.innerText = "";
    }
    else {
      email_Id.classList.add("Error-Input");
      email_Error.innerText = "Enter valid Email";
    }
  }
}


// *******************  Passsword Validation **************


function validatePasswords() {
  const createPassword = document.getElementById('CP').value;
  const confirmPassword = document.getElementById('Confirm-Password').value;

  const createPasswordError = document.querySelector(".create-password-small");
  const confirmPasswordError = document.getElementById('confirm-Password-Small');

  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordCriteria.test(createPassword)) {
    createPasswordValid = false;
    createPasswordError.innerText = 'Password must have uppercase lowercase numbers and special character';
    document.getElementById('CP').classList.add('Error-Input');
  } else {
    createPasswordError.innerText = '';
    document.getElementById('CP').classList.remove('Error-Input');
    document.getElementById('CP').classList.add('success');
  }

  if (createPassword !== confirmPassword) {
    // confirmPasswordValid = false;
    confirmPasswordError.innerText = 'Passwords do not match.';
    document.getElementById('Confirm-Password').classList.add('Error-Input');
  } else {
    confirmPasswordError.innerText = '';
    document.getElementById('Confirm-Password').classList.remove('Error-Input');
  }
}

const createPassword = document.querySelector("#CP");
const confirmPassword = document.querySelector("#Confirm-Password");

createPassword.oninput = () => {
  validatePasswords();
}
confirmPassword.oninput = () => {
  validatePasswords();
}


// // **************Password Visiblity*********
let Hide_Password = document.querySelector(".Hide-Password");
document.addEventListener("DOMContentLoaded", function () {

  Hide_Password.addEventListener("click", function () {

    const create_Password = document.querySelector("#CP");
    const confirm_Password = document.querySelector("#Confirm-Password");

    if (create_Password.type === "password") {
      create_Password.type = "text";
      confirm_Password.type = "text";
      Hide_Password.classList.toggle("bxs-show");
      Hide_Password.classList.toggle("bxs-hide");

    } else {
      create_Password.type = "password";
      confirm_Password.type = "password";
      Hide_Password.classList.toggle("bxs-show");
      Hide_Password.classList.toggle("bxs-hide");
    }
  });
});


// *********************Submit Button Validation *********************

let submit_btn = document.querySelector(".btn");
let form = document.querySelector("form");

submit_btn.onclick = (e) => {
  e.preventDefault();
  let isValid = true;

  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];

    if (element.type !== "submit" && element.classList.contains("Error-Input")) {
      element.focus();
      alert("Please fill all necessary fields correctly");
      isValid = false;
      break;
    }
  }

  if (isValid) {
    form.submit();
    alert("Your form has been successfully submitted...!");
  }
}










