// **************************************************VARIABLE**************************************************\\
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
let contact = JSON.parse(localStorage.getItem("contact"));
const btnSendForm = document.querySelector("#send_form");
const form = document.querySelector("#array_form");
let products = [];

const sendAll = {
  products,
  contact,
};

// *********************************************FONCTIONS PRINCIPALES*********************************************\\

// Ecoute des évènement au clique du bouton
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();

  // Récupération valeurs du formulaire dans une constante
  const formValues = {
    firstName: document.querySelector("#first_name").value,
    lastName: document.querySelector("#last_name").value,
    address: document.querySelector("#adress").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#e_mail").value,
    // zip_code: document.querySelector("#zip_code").value,
  };

  //Récupération données saisies par l'utilisateur pour les controlés
  const firstNameUser = formValues.firstName;
  const lastNameUser = formValues.lastName;
  const adressUser = formValues.adress;
  const cityUser = formValues.city;
  const emailUser = formValues.email;
  // const zipCodeUser = formValues.zip_code;

  //Déclaration des Regexp pour controler le formulaire
  // Prénom , Nom , Ville
  const regexFormValues = (value) => {
    return /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(value);
  };
  // Code Postal
  // const regexZipCodeValue = (value) => {
  //   return /^[0-9]{5}$/.test(value);
  // };
  //Adresse
  const regexAdressValue = (value) => {
    return /^([0-9a-zA-Z,\.]*)?([0-9]{5})?([a-zA-Z])$/gm.test(value);
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
      alert(textAlert("ADRESSE"));
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

  function zipCodeControl() {
    if (regexZipCodeValue(zipCodeUser)) {
      return true;
    } else {
      alert("CODE POSTAL : Doit être composé de 5 chiffres.");
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
    cityControl() &&
    adressControl() &&
    emailControl()
    // zipCodeControl() &&
  ) {
    alert("Votre formulaire est validé.");
    localStorage.setItem("contact", JSON.stringify(formValues));
    //Récupération des Id nounours pour envoi serveur
    productLocalStorage.forEach((dataId) => {
      products.push(dataId.id);
    });
  }

  // Envoyer la commande et le formulaire au serveur
  function postfetch() {
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(sendAll),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .catch((error) => console.log(error))
      .then((responseServer) => {
        alert("Votre commande à bien été envoyé.");
        window.location.href = "confirmation.html";
        console.log(responseServer);
      });
  }

  postfetch();
});
