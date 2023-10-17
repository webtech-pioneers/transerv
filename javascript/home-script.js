const sort = document.querySelector(".sort-box"),
  sortBtn = sort.querySelector(".sort-btn"),
  sortAll = sort.querySelectorAll(".sort"),
  col = document.getElementsByClassName("sort-btn")
  selectBtn = document.querySelector(".select-btn"),
    items = document.querySelectorAll(".item");

//EXPAND SORT
var i;
for (i = 0; i < col.length; i++) {
  col[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
//SORT CHANGE
sortBtn.addEventListener("click", () => {
  sortBtn.classList.toggle("open");
});
//SORT SELECTION
sortAll.forEach(option =>{
	option.addEventListener("click", ()=> {
		let selected = option.innerText;
		sortBtn.innerText = selected;
		console.log(selected);
	})
})
//TAG SELECTION CHANGE
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});
//TAG SELECTIONS
items.forEach(item => {
  item.addEventListener("click", () => {
      item.classList.toggle("selected");
      let checked = document.querySelectorAll(".selected"),
          btnText = document.querySelector(".btn-text");
          if(checked && checked.length > 0){
              btnText.innerText = `${checked.length} Selected Tags`;
          }else{
              btnText.innerText = "Select Tags";
          }
  });
})

document.addEventListener('DOMContentLoaded', function() {
  let currentPage = 1;
  const roomsPerPage = 10;
  let selectedTags = []; // Array to store selected tags

  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');
  const searchbar = document.getElementById('searchbar');
  const filterList = document.querySelectorAll('.filter li');
  

  let allRooms = [];
  let filteredRooms = [];

  fetch('rooms.json')
    .then(response => response.json())
    .then(data => {
      allRooms = data;
      filteredRooms = allRooms;
      displayRooms();

      searchbar.addEventListener('input', () => {
        currentPage = 1; 
        filteredRooms = filterRooms(allRooms, searchbar.value);
        displayRooms();
      });

      filterList.forEach(filterItem => {
        filterItem.addEventListener('click', () => {
          const filterValue = filterItem.getAttribute('data-filter');
          currentPage = 1; 
          filteredRooms = filterRoomsByType(allRooms, filterValue);
          displayRooms();
        });
      });

      nextButton.addEventListener('click', function() {
        currentPage++;
        displayRooms();
      });

      prevButton.addEventListener('click', function() {
        currentPage--;
        displayRooms();
      });
    })
    .catch(error => console.error(error));

    function sortByNameAZ() {
      filteredRooms.sort((a, b) => a.roomName.localeCompare(b.roomName));
      displayRooms();
    }
  
    // Function to sort rooms by price (Low to High)
    function sortByPriceLowToHigh() {
      filteredRooms.sort((a, b) => a.price - b.price);
      displayRooms();
    }
  
    // Function to sort rooms by rating (High to Low)
    function sortByRatingHighToLow() {
      filteredRooms.sort((a, b) => b.rating - a.rating);
      displayRooms();
    }

    function resetSortAndFilter() {
      sortBtn.innerText = 'Sort';
      filteredRooms = allRooms; // Reset to all rooms
      searchbar.value = ''; // Clear the search bar
      displayRooms();
    }
  
    // Add event listeners for sorting options
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('click', (event) => {
      const selectedOption = event.target.innerText;
      switch (selectedOption) {
        case 'Sort':
          resetSortAndFilter(); 
          break;
        case 'Name (A-Z)':
          sortByNameAZ();
          break;
        case 'Price (Low to High)':
          sortByPriceLowToHigh();
          break;
        case 'Popular (High to Low)':
          sortByRatingHighToLow();
          break;
        default:
          break;
      }
    });
    

  function displayRooms() {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;

    const currentRooms = filteredRooms.slice(startIndex, endIndex);

    const boxes = document.querySelectorAll('.box');

    boxes.forEach((box, index) => {
      if (index < currentRooms.length) {
        const room = currentRooms[index];
        const h3 = box.querySelector('h3');
        const roomType = box.querySelector('.room-type');
        const beds = box.querySelector('.beds');
        const rooms = box.querySelector('.rooms');
        const price = box.querySelector('.price');
        const tags = box.querySelector('.tags'); 


        h3.textContent = room.roomName;
        roomType.textContent = room.type; 
        beds.textContent = room.beds; 
        rooms.textContent = room.rooms; 
        price.textContent = `${room.price}`; 
        const tagsList = Object.keys(room.tags).filter(tag => room.tags[tag]);
        tags.textContent = "Tags: " + tagsList.join(', ');
        
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });

    nextButton.disabled = currentPage * roomsPerPage >= filteredRooms.length;
    prevButton.disabled = currentPage <= 1;
  }

  function filterRooms(rooms, searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    if (searchTerm === '') {
      return rooms;
    }

    return rooms.filter(room => room.roomName.toLowerCase().startsWith(searchTerm));
  }

  function filterRoomsByType(rooms, roomType) {
    if (roomType === 'all') {
      return rooms;
    }

    return rooms.filter(room => room.type.toLowerCase() === roomType);
  }
});


