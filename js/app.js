
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
  console.log('ServiceWorker registration failed: ', err);
});
}else {
console.log('No service-worker on this browser');
}

const wnumber = document.getElementById("wnumber");
const selector = document.getElementById("selector");
const formWhatsapp = document.getElementById("formWhatsapp");

const headers = new Headers({
  "Content-Type": "application/json",
});

const init = {
  method: "GET",
  headers,
};

fetch('https://country-cities.herokuapp.com/api/v0.1/countries/codes', init)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    myJson.data.forEach((element) => {
      let option = document.createElement("option");
      option.value = element.dial_code;
      option.innerHTML = element.name;
      selector.appendChild(option);
    });
    const lastSelection = getLastSelection();
    if( lastSelection ) {
      selector.value = lastSelection;
    }
  });

// ****************
const sendMessage = (e) => {
  e.preventDefault();
  var numberPattern = /\d+/g;
  const phoneNumber = wnumber.value.match( numberPattern ).join('');
  if (phoneNumber.length != 10) {
    alert("Enter a valid 10-digit number");
    return;
  }
  saveLastSelection(selector.value);
  const completePhoneNumber = createValidNumber(selector.value) + phoneNumber;
  window.location.href = `whatsapp://send?phone=${completePhoneNumber}`;
};

// ****************
const saveLastSelection = (countryCode) => {
  localStorage.setItem("lastCountry", countryCode);
}

const getLastSelection = () => {
  return localStorage.getItem("lastCountry");
}

const createValidNumber = (str) => {
  let validNumber = "";
  for (let s of str) {
    if (s.match(/^[0-9]$/)) validNumber += s;
  }
  return validNumber;
};

//wnumber.addEventListener('input', updateValue)
//sendButton.addEventListener('click', sendMessage)
formWhatsapp.addEventListener("submit", sendMessage, true);
