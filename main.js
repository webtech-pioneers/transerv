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

//   document.addEventListener('DOMContentLoaded', function () {
//     const reservationForm = document.getElementById('reservationForm');
//     const output = document.getElementById('output');

//     reservationForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const formData = new FormData(reservationForm);
//         const formDataObject = {};
//         formData.forEach((value, key) => {
//             formDataObject[key] = value;
//         });

//         const fs = require('fs'); 

//         fs.readFile('list2.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }

//             let jsonData = JSON.parse(data);

//             // Append the new reservation data to the existing JSON array
//             jsonData.push(formDataObject);

//             // Write the updated JSON back to the file
//             fs.writeFile('list2.json', JSON.stringify(jsonData), 'utf8', (err) => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     output.innerText = 'Reservation saved successfully!';
//                 }
//             });
//         });
//     });
// });
