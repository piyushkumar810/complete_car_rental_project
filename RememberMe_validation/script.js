const keepLoogedIn = document.getElementById("RememberMe");
const submit_btn = document.querySelector(".btn");
const form = document.querySelector("form");
keepLoogedIn.onclick = (e) => {
  // e.preventDefault();
  if (keepLoogedIn.checked) {
    keepLoogedIn.setAttribute("title", "yes");
  }
  if (!keepLoogedIn.checked) {
    keepLoogedIn.setAttribute("title", "no");
  }
  console.log(keepLoogedIn.checked);
  console.log(!keepLoogedIn.checked);
}