

let menu = document.querySelector('.navbar');
console.log(menu);
document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active')
}

// ------------------header------------------

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});