console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchElement.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
