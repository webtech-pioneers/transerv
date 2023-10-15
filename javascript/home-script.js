const sort = document.querySelector(".sort-box"),
sortBtn = sort.querySelector(".sort-btn"),
sortAll = sort.querySelectorAll(".sort"),
col = document.getElementsByClassName("sort-btn")
;

//SORT SELECTION
sortAll.forEach(option =>{
	option.addEventListener("click", ()=> {
		let selected = option.innerText;
		sortBtn.innerText = selected;
		console.log(selected);
	})
})

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
