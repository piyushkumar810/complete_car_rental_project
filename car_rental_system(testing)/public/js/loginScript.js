const container = document.querySelector('.container');
const  loginLink= document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
// const closeIcon=document.querySelector('.icon-close')



registerLink.addEventListener('click', ()=>{
    container.classList.add('active')
})

loginLink.addEventListener('click', ()=>{
    container.classList.remove('active')
})

// applying action on cross icon
// closeIcon.addEventListener('click', ()=>{
//     container.classList.remove('active')
// })


// -----------------------login page validation

var email = document.querySelector("#userEmail");
email.oninput=()=>{

    console.log(email.value);
}

// document.addEventListener("DOMContentLoaded", function() {
//     var email = document.getElementById("userEmail").value;
//     console.log(email);
// });

var password = document.querySelector("#userPassword").value;
console.log(password);