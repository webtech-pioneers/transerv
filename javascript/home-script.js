const sort = document.querySelector(".sort-box"),
  sortBtn = sort.querySelector(".sort-btn"),
  sortAll = sort.querySelectorAll(".sort"),
  col = document.getElementsByClassName("sort-btn")
  selectBtn = document.querySelector(".select-btn"),
    items = document.querySelectorAll(".item")

;

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

  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');

  fetch('rooms.json')
      .then(response => response.json())
      .then(data => {
          function displayRooms() {
              const startIndex = (currentPage - 1) * roomsPerPage;
              const endIndex = startIndex + roomsPerPage;
              const currentRooms = data.slice(startIndex, endIndex);

              const boxes = document.querySelectorAll('.box');

              boxes.forEach((box, index) => {
                  if (index < currentRooms.length) {
                      const room = currentRooms[index];
                      const h3 = box.querySelector('h3');
                      const p = box.querySelector('p');

                      h3.textContent = room.roomName;
                      p.textContent = `Price: $${room.price}`;
                      box.style.display = 'block'; 
                  } else {
                      box.style.display = 'none';
                  }
              });
              nextButton.disabled = currentPage * roomsPerPage >= data.length;
              prevButton.disabled = currentPage <= 1;
          }
          displayRooms();
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
});
