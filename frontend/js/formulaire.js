// **************************************************VARIABLE**************************************************\\
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

const btnSendForm = document.querySelector("#send_form");
const form = document.querySelector("#array_form");

let products = [];

// *********************************************FONCTIONS PRINCIPALES*********************************************\\

// Ecoute des évènement au clique du bouton
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // Récupération valeurs du formulaire dans une constante
  const contact = {
    firstName: document.querySelector("#first_name").value,
    lastName: document.querySelector("#last_name").value,
    address: document.querySelector("#adress").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#e_mail").value,
  };

  //Récupération données saisies par l'utilisateur pour les controlés
  const firstNameUser = contact.firstName;
  const lastNameUser = contact.lastName;
  const adressUser = contact.address;
  const cityUser = contact.city;
  const emailUser = contact.email;

  //Déclaration des Regexp pour controler le formulaire
  // Prénom , Nom , Ville
  const regexFormValues = (value) => {
    // return /^([A-Za-z]{2,20})?([-][ ]{0,1})?([A-Za-z]{2,20})$/.test(value);
    return /^[A-Za-z0-9\s-,'ÀÂÄÇÈÉÊËÎÏÔÖÙÛÜàâäçéèêëîïôöùûü]{0,50}$/.test(value);
  };
  //Adresse
  const regexAdressValue = (value) => {
    return /^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9-]+$/.test(value);
  };
  //Email
  const regexEmailValue = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  //Condition si données sont correctes
  function firstNameControl() {
    if (regexFormValues(firstNameUser)) {
      return true;
    } else {
      alert(textAlert("PRENOM"));
      return false;
    }
  }

  function lastNameControl() {
    if (regexFormValues(lastNameUser)) {
      return true;
    } else {
      alert(textAlert("NOM"));
      return false;
    }
  }

  function adressControl() {
    if (regexAdressValue(adressUser)) {
      return true;
    } else {
      alert("Veuillez entrer une adresse valide");
      return false;
    }
  }

  function cityControl() {
    if (regexFormValues(cityUser)) {
      return true;
    } else {
      alert(textAlert("VILLE"));
      return false;
    }
  }

  function emailControl() {
    if (regexEmailValue(emailUser)) {
      return true;
    } else {
      alert("EMAIL : Non valide");
      return false;
    }
  }

  //Affichage alerte si prénom, nom ville sont incorrectes
  const textAlert = (value) => {
    return `${value} : Chiffres et symboles non valide\n Caractères 2 < 20`;
  };

  // Envoyer formulaire au local storage SI les données sont valides
  if (
    firstNameControl() &&
    lastNameControl() &&
    adressControl() &&
    cityControl() &&
    emailControl()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
    //Récupération des Id nounours pour l'envoi au serveur
    productLocalStorage.forEach((dataId) => {
      products.push(dataId.id);
    });
    const sendAll = {
      products,
      contact,
    };
    console.log(sendAll);
    postfetch(sendAll);
  }
});

// Envoyer la commande et le formulaire au serveur
function postfetch(sendAll) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(sendAll),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .catch((error) => console.log(error))
    .then((dataResponse) => {
      localStorage.setItem(
        "responseOrderId",
        JSON.stringify(dataResponse.orderId)
      );
      window.location.replace("confirmation.html");
    });
}
