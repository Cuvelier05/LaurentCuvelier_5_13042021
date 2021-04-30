let price = JSON.parse(localStorage.getItem("totalPriceCommand"));
let orderId = JSON.parse(localStorage.getItem("responseOrderId"));
let userInfo = JSON.parse(localStorage.getItem("contact"));

// console.log(price);
console.log(orderId);
console.log(userInfo);

let showCommand = document.querySelector("#commandNumber");
function showCommandNumber() {
  showCommand.innerHTML = `
  <p>Votre commande <br> numéro:${orderId} <br> et d'un montant de ${price}€ sera envoyé à l'adresse suivante :${userInfo.address} ${userInfo.city}.</p>
  <p>Merci ${userInfo.lastName} ${userInfo.firstName} pour votre achat.</p><br>
  <p>A trés bientôt pour un nouvel achat.</p>
  `;
}
showCommandNumber();
localStorage.clear();
