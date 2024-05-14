const container = document.querySelector('.container');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
// const closeIcon=document.querySelector('.icon-close')



registerLink.addEventListener('click', () => {
  container.classList.add('active')
})

loginLink.addEventListener('click', () => {
  container.classList.remove('active')
})

// applying action on cross icon
// closeIcon.addEventListener('click', ()=>{
//     container.classList.remove('active')
// })
