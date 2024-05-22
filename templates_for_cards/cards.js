const ul = document.querySelector(".main-ul");
let click = document.querySelector("button");

var createitems = () => {

  let li = document.createElement("li");
  ul.append(li);
  let img = document.createElement("img");
  img.src = "Profile_1.jpg";
  li.append(img);
  let detailsDiv = document.createElement("div");
  detailsDiv.classList.add("details");
  li.append(detailsDiv);
  let carTitle = document.createElement("i");
  carTitle.innerText = "Lorem ipsum dolor sit amet";
  detailsDiv.append(carTitle);
  let carDetails = document.createElement("p");
  carDetails.innerText = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!";
  detailsDiv.append(carDetails);
  let seatDetails = document.createElement("b");
  seatDetails.innerText = "2 Seater";
  detailsDiv.append(seatDetails);
  let bookingDiv = document.createElement("div");
  bookingDiv.classList.add("booking");
  detailsDiv.append(bookingDiv);
  let bookNow = document.createElement("a");
  bookNow.innerText = "Book Now";
  let moreDetails = document.createElement("a");
  moreDetails.innerText = "more details..";
  bookingDiv.append(bookNow);
  bookingDiv.append(moreDetails);
}

click.onclick = () => {
  for (i = 0; i < 10; i++) {
    createitems();
  }
}