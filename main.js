//WRITE JSON

//READ JSON
var output = document.getElementById('output');
fetch(new Request('./list.json'))
  .then(response => response.json())
  .then(json => {
    for (const key in json) {
        const paragraph = document.createElement('p');
        paragraph.textContent = json[key].fullname.firstname;
        output.appendChild(paragraph);
      }
  });