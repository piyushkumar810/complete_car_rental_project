let parentElement = document.querySelector(".main-ul");

// cards.js

// Sample data for list items
const data = [
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  {
    imgSrc: 'Profile_1.jpg',
    altText: 'Profile_1',
    italicText: 'Lorem ipsum dolor sit amet',
    paragraphText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ratione cum odit velit labore!',
    boldText: '2 Seater'
  },
  // Add more objects as needed
];

// Function to create a new list item
function createListItem(item) {
  // Create <li> element
  const li = document.createElement('li');

  // Create and append <img> element
  const img = document.createElement('img');
  img.src = item.imgSrc;
  img.alt = item.altText;
  li.appendChild(img);

  // Create and append <div> element with class "details"
  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details');
  li.appendChild(detailsDiv);

  // Create and append <i> element
  const italic = document.createElement('i');
  italic.textContent = item.italicText;
  detailsDiv.appendChild(italic);

  // Create and append <p> element
  const paragraph = document.createElement('p');
  paragraph.textContent = item.paragraphText;
  detailsDiv.appendChild(paragraph);

  // Create and append <b> element
  const bold = document.createElement('b');
  bold.textContent = item.boldText;
  detailsDiv.appendChild(bold);

  // Create and append <div> element with class "booking"
  const bookingDiv = document.createElement('div');
  bookingDiv.classList.add('booking');
  detailsDiv.appendChild(bookingDiv);

  // Create and append "Book Now" link
  const bookNowLink = document.createElement('a');
  bookNowLink.href = '#';
  bookNowLink.textContent = 'Book Now';
  bookingDiv.appendChild(bookNowLink);

  // Create and append "More Details" link
  const moreDetailsLink = document.createElement('a');
  moreDetailsLink.href = '#';
  moreDetailsLink.textContent = 'More Details';
  bookingDiv.appendChild(moreDetailsLink);

  return li;
}

function renderList() {
  // Get the <ul> element with class "main-ul"
  const ul = document.querySelector('.main-ul');

  // Loop through the data array and create list items
  data.forEach(item => {
    const listItem = createListItem(item);
    ul.appendChild(listItem);
  });
}



document.addEventListener('DOMContentLoaded', renderList);