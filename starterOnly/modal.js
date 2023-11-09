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
const form = document.forms['reserve'];
const modalBody = document.querySelector('.modal-body');
const successMessage = document.createElement("div");
const closeButton = document.createElement("input");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

function closeModal() {
    form.classList.remove('hidden')
    form.style.display = "block";
    modalbg.style.display = "none";
    successMessage.style.display = 'none';
    closeButton.style.display = 'none';
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
function cleanInputValue(){
    firstName.value = '';
    lastName.value = '';
    mailAdress.value = '';
    birthDate.value = '';
    tourneys.value = '';
    radioLocations.value = '';
    conditions.value = '';
}

// Submit form
submitModal.addEventListener('submit', function(e) {
    mailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,63})$/;
    tourneyFormat = /^[0-9]{1,100}$/;
    const birth = new Date(birthDate.value);
    const today = new Date();
    let isLocationChecked = 0;
    let hasError= 0;
    
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
    
    for (var i = 0; i < formData.length; i++) {
        if (formData[i].hasAttribute('data-error')) {
        hasError = 1;
        break;
        }
    }
    if(!hasError){
        form.classList.add("hidden");
        setTimeout(function() {
            form.style.display = "none";
        }, 500); 
        
        
        // Create and append the success message div with paragraph


        successMessage.id = "successMessage";
        successMessage.innerHTML = "<p style='font-size: 36px;'>Merci pour <br/>votre inscription !</p>";
        successMessage.style.display = 'block';
        successMessage.style.textAlign = 'center';
        
        // Center the success message
        successMessage.style.position = "fixed";
        successMessage.style.top = "50%";
        successMessage.style.left = "50%";
        successMessage.style.transform = "translate(-50%, -50%)";
        
        // Append the success message to the document body
        modalBody.appendChild(successMessage);

        closeButton.type = "button";
        closeButton.value = "Fermer";
        closeButton.className = "btn-submit"; // Same class as the submit button
        closeButton.style.position = "absolute";
        closeButton.style.bottom = "20px"; // Adjust the distance from the bottom as needed
        closeButton.style.left = "50%";
        closeButton.style.transform = "translateX(-50%)";
        closeButton.addEventListener("click", closeModal);
        modalBody.appendChild(closeButton);

        setTimeout(()=>{
            cleanInputValue();
        }, 500);
    }
})