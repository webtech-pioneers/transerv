const circles = document.querySelectorAll(".circle"),
    progressBar = document.querySelector(".indicator"),
    prevButton = document.getElementById("prev"),
    nextButton = document.getElementById("next"),

    //img
    carousel = document.querySelector(".carousel"),
    img = carousel.querySelectorAll("img"),
    imgIcons = document.querySelectorAll(".img-container span"),

    //guests
    addAdult = document.getElementById("add-adult"),
    adultNum = document.getElementById("adult-number"),
    minusAdult = document.getElementById("minus-adult"),

    addChildren = document.getElementById("add-children"),
    childrenNum = document.getElementById("children-number"),
    minusChildren = document.getElementById("minus-children"),

    addInfant = document.getElementById("add-infant"),
    infantNum = document.getElementById("infant-number"),
    minusInfant = document.getElementById("minus-infant")
    ;

let firstImg = img[0].clientWidth+14;

imgIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		carousel.scrollLeft += icon.id == "left" ? -firstImg : firstImg;
	});
});;

//adult guests
let a = parseInt(adultNum.textContent);
addAdult.addEventListener("click", () => {
  adultNum.textContent = parseInt(adultNum.textContent) + 1;
})
minusAdult.addEventListener("click", () => {
  if (parseInt(adultNum.textContent) > 1) {
    adultNum.textContent = parseInt(adultNum.textContent) - 1;
  }
})


//children guests
addChildren.addEventListener("click", () => {
  childrenNum.textContent = parseInt(childrenNum.textContent) + 1;
})
minusChildren.addEventListener("click", () => {
  if (parseInt(childrenNum.textContent) > 0) {
    childrenNum.textContent = parseInt(childrenNum.textContent) - 1;
  }
})


//infant guests
addInfant.addEventListener("click", () => {
  infantNum.textContent = parseInt(infantNum.textContent) + 1;
})

minusInfant.addEventListener("click", () => {
  if (parseInt(infantNum.textContent) > 0) {
    infantNum.textContent = parseInt(infantNum.textContent) - 1;
  }
})




//progress bar
let currentStep = 1;

const updateSteps = (e) => {
  currentStep = e.target.id === "next" ? ++currentStep : --currentStep;

  circles.forEach((circle, index) => {
    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });

  progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;

  if (currentStep === 1) {
    //buttons
    prevButton.disabled = true;
    nextButton.textContent = 'Next';
    
    //content
    document.getElementById("trip-details").style.display = 'block';
    document.getElementById("personal-information").style.display = 'none';
    document.getElementById("payment-information").style.display = 'none';
    document.getElementById("summary").style.display = 'none';

    //label
    document.getElementById("t-info").style.color = "#22D6F7";
    document.getElementById("p-info").style.color = "black";
    document.getElementById("pa-info").style.color = "black";
    document.getElementById("s-info").style.color = "black";
  } else if (currentStep === 2){
    //buttons
    nextButton.textContent = 'Next';
    prevButton.disabled = false;

//personal info
if (document.getElementById("lastName") === "" || document.getElementById("firstName") === "" 
|| document.getElementById("cell")=== "" || document.getElementById("addr") === ""|| document.getElementById("zip") === "") {
  nextButton.disabled = true;
} else {
  nextButton.disabled = false;
}

    //content
    document.getElementById("personal-information").style.display = 'block';
    document.getElementById("trip-details").style.display = 'none';
    document.getElementById("payment-information").style.display = 'none';
    document.getElementById("summary").style.display = 'none';

    //label
    document.getElementById("p-info").style.color = "#22D6F7";
    document.getElementById("pa-info").style.color = "black";
    document.getElementById("s-info").style.color = "black";
  } else if (currentStep === 3) {
    //buttons
    nextButton.textContent = 'Finish';
    prevButton.disabled = false;

   //content
   document.getElementById("payment-information").style.display = 'block';
   document.getElementById("trip-details").style.display = 'none';
   document.getElementById("personal-information").style.display = 'none';
   document.getElementById("summary").style.display = 'none';

   //label
   document.getElementById("pa-info").style.color = "#22D6F7";
   document.getElementById("s-info").style.color = "black";
  } else if (currentStep === 4) {
    //buttons
    nextButton.textContent = 'Return to Home';
    prevButton.disabled = true;

    //content
    document.getElementById("summary").style.display = 'block';
    document.getElementById("trip-details").style.display = 'none';
    document.getElementById("personal-information").style.display = 'none';
    document.getElementById("payment-information").style.display = 'none';

    //label
    document.getElementById("s-info").style.color = "#22D6F7";
  }
};

prevButton.addEventListener("click", updateSteps);
nextButton.addEventListener("click", updateSteps);
