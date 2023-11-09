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
const emailAddress = document.getElementById('email');
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

function verifyField(condition, errMsg, i) {
    if (condition) {
        formData[i].dataset.error = errMsg;
        formData[i].dataset.errorVisible = 'true';
    } else {
        formData[i].removeAttribute('data-error');
        formData[i].removeAttribute('data-error-visible');
    }
}

function cleanInputValue() {
    firstName.value = '';
    lastName.value = '';
    emailAddress.value = '';
    birthDate.value = '';
    tourneys.value = '';
    radioLocations.value = '';
    conditions.value = '';
}

function outputResult(){
    // Output field values to the console
    console.log("First Name:", firstName.value);
    console.log("Last Name:", lastName.value);
    console.log("Email Address:", emailAddress.value);
    console.log("Birth Date:", birthDate.value);
    console.log("Number of Tournaments:", tourneys.value);

    const selectedLocation = document.querySelector('input[type="radio"]:checked');
    console.log("Selected Location:", selectedLocation ? selectedLocation.value : "None");

    console.log("Conditions Accepted:", conditions.checked);
}

// Submit form
submitModal.addEventListener('submit', function (e) {
    const emailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,63})$/;
    const tourneyFormat = /^[0-9]{1,100}$/;
    const birth = new Date(birthDate.value);
    const today = new Date();
    const LOCATION_CHECKED = 1;
    let isLocationChecked = 0;
    let hasError = 0;

    // Bloquer le fonctionnement habituel du formulaire
    e.preventDefault();

    for (const radioLocation of radioLocations) {
        if (radioLocation.checked) {
            isLocationChecked = LOCATION_CHECKED;
            break;
        }
    }

    const formsData = [
        { conditions: firstName.value.length < 2, error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.' },
        { conditions: lastName.value.length < 2, error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.' },
        { conditions: !emailFormat.test(emailAddress.value), error: 'Veuillez entrer une adresse email valide.' },
        { conditions: (isNaN(Date.parse(birthDate.value))) || (birth > today), error: 'Veuillez entrer une date valide au format aaaa-mm-jj' },
        { conditions: !tourneyFormat.test(tourneys.value), error: 'Vous devez insérer une valeur numérique.' },
        { conditions: isLocationChecked !== LOCATION_CHECKED, error: 'Vous devez sélectionner une ville.' },
        { conditions: !(conditions.checked), error: 'Vous devez accepter les conditions d\'utilisation.' },
    ];

    formsData.forEach((item, i) => {
        const condition = item.conditions;
        const error = item.error;
        verifyField(condition, error, i);
    });

    for (let i = 0; i < formData.length; i++) {
        if (formData[i].hasAttribute('data-error')) {
            hasError = 1;
            break;
        }
    }
    if (!hasError) {
        form.classList.add("hidden");
        outputResult();
        setTimeout(function () {
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

        setTimeout(() => {
            cleanInputValue();
        }, 500);
    }
});
