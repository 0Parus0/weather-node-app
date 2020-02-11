console.log('Client side Javascript file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//   response.json().then(data => {
//     console.log(data);
//   })
// })

// fetch('http://localhost:3000/weather?address=!')
//   .then(response => {
//     response.json()
//       .then(data => {
//         console.log(data);
//       })
//   })
//   .catch(error => {
//     console.log(error);
//   })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  messageOne.textContent = 'Loading...'
  messageTwo.textContent='';


  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then(response => {
    response.json()
      .then(data => {
        if(data.error) {
          messageOne.textContent=data.error;
          messageTwo.textContent='';

        } else {
          messageOne.textContent=data.location;
          messageTwo.textContent=data.forecast;
        }
      })
  });
})