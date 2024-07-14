let icon = document.querySelector(".icons");
let list = document.querySelector("ul");
let show_menu = document.querySelector(".icon");
let hide_menu = document.querySelector(".close-icon");
icon.onclick = () => {
    list.classList.toggle("show-menu");
    show_menu.classList.toggle("display-none");
    hide_menu.classList.toggle("display-none");
};


