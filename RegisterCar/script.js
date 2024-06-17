const form = document.querySelector("form");
const sb = document.querySelector(".sumbitBtn");
sb.onclick = () => {
  console.log(document.querySelector("#registartion_number").value);
}