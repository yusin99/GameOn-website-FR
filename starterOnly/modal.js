function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const submitModal = document.forms[0];
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const mailAdress = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const tourneys = document.getElementById('quantity');
const radioLocations = document.querySelectorAll('input[type="radio"]');
const conditions = document.getElementById('checkbox1');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

function closeModal() {
    modalbg.style.display = "none";
}

function verifyField(condition, errMsg, i){
    if(condition){
        formData[i].dataset.error = errMsg;
        formData[i].dataset.errorVisible = 'true';
    }
    else {
        formData[i].removeAttribute('data-error');
        formData[i].removeAttribute('data-error-visible');
      }
}

// Submit form
submitModal.addEventListener('submit', function(e) {
    mailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,63})$/;
    tourneyFormat = /^[0-9]{1,100}$/;
    const birth = new Date(birthDate.value);
    const today = new Date();
    let isLocationChecked = 0;
    // Bloquer le fonctionnement habituel du formulaire
    e.preventDefault();

    for (radioLocation of radioLocations) {
        if (radioLocation.checked) {
          isLocationChecked = 1;
          break;
        }
    };

    const formsData = [
        {conditions: firstName.value.length < 2, error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.' },
        {conditions: lastName.value.length < 2, error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.' },
        {conditions: !mailFormat.test(mailAdress.value), error: 'Veuillez entrer une adresse email valide.' },
        {conditions: (isNaN(Date.parse(birthDate.value))) || (birth > today), error: 'Veuillez entrer une date valide au format aaaa-mm-jj' },
        {conditions: !tourneyFormat.test(tourneys.value), error: 'Vous devez insérer une valeur numérique.' },
        {conditions: isLocationChecked != 1, error: 'Vous devez sélectionner une ville.' },
        {conditions:  !(conditions.checked), error: 'Vous devez accepter les conditions d\'utilisation.' },
    ];

    formsData.forEach((item, i)=>{
        const condition = item.conditions;
        const error = item.error;
        verifyField(condition, error, i);
    })
})