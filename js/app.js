if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
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
  });

// ****************
const sendMessage = (e) => {
  e.preventDefault();
  var numberPattern = /\d+/g;
  const phoneNumber = wnumber.value.match( numberPattern ).join('');
  if (phoneNumber.length != 10) {
    alert("Ingresa un numero valido de 10 digitos");
    return;
  }
  const completePhoneNumber = createValidNumber(selector.value) + phoneNumber;
  window.open(`https://wa.me/${completePhoneNumber}`);
};

// ****************
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
