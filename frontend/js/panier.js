// **************************************************VARIABLE**************************************************\\
//  Données des produits enregistrer dans le local storage
let saveProductOnLocalStorage = JSON.parse(localStorage.getItem("product"));

// AFfichage produit du panier
const displayEmptyBasket = document.querySelector("#container_list_product");
const displayFullBasket = document.querySelector("#show_basket_proudct");

// *****CONDITION*****

// Si le panier est vide
if (saveProductOnLocalStorage === null) {
  let emptyBasket = `
  <table align = center>
   <thead>
    <tr>
     <th>Le panier est vide</th>
    </tr>
   </thead>
  </table>
  `;
  displayEmptyBasket.innerHTML = emptyBasket;
}
//Affichage des produits choisis dans un tableau
else {
  let fullBasket = [];
  for (i = 0; i < saveProductOnLocalStorage.length; i++) {
    fullBasket += `
          <tr>
            <td class="product_basket">${saveProductOnLocalStorage[i].name}</td>
              <td class = "option_basket">${saveProductOnLocalStorage[i].option}</td>
                <td class = "quantity_basket">${saveProductOnLocalStorage[i].quantity}</td>
                  <td class = "price_basket">${saveProductOnLocalStorage[i].price} €</td>
          <tr>
      `;
  }
  if (i === saveProductOnLocalStorage.length) {
    displayFullBasket.innerHTML = fullBasket;
  }
}

//  --------------------Création du bouton SUPPRIMER LE PANIER-------------------------//

let deleteBasket = `   
    <tr>
    <td colspan="5"><button class = "deleteAll">Supprimer le panier</button></td>
    </tr>
  `;

displayFullBasket.insertAdjacentHTML("beforeend", deleteBasket);

let deleteAll = document.querySelector(".deleteAll");
if (deleteAll) {
  deleteAll.addEventListener("click", (e) => {
    e.preventDefault;
    e.stopPropagation;
    localStorage.removeItem("form");
    localStorage.removeItem("teddyBear");
    alert("Vous avez supprimer votre panier");
    window.location.href = "panier.html";
  });
}

//  --------------------Calcul du prix total du panier-------------------------//
let totalBasketPrice = [];

if (saveProductOnLocalStorage) {
  for (i = 0; i < saveProductOnLocalStorage.length; i++) {
    let totalProductPrice = saveProductOnLocalStorage[i].price;

    totalBasketPrice.push(totalProductPrice);
  }
}

function summarize(acc, cur) {
  return Number(acc) + Number(cur);
}

const totalPrice = Number(totalBasketPrice.reduce(summarize, 0));

let basketPrice = `   
<tr>
<td colspan="5">Le prix total de votre panier est de <span class="total_price">${totalPrice} €</span></td>
</tr>
`;

displayFullBasket.insertAdjacentHTML("beforeend", basketPrice);

//  --------------------Création du bouton VALIDER LE PANIER-------------------------//
let confirmBasket = `   
    <tr>
    <td colspan="5"><button class = "confirmBtn">Valider le panier</button></td>
    </tr>
  `;

displayFullBasket.insertAdjacentHTML("beforeend", confirmBasket);

let confirmBtn = document.querySelector(".confirmBtn");
if (confirmBtn) {
  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault;
    e.stopPropagation;
    alert("Plus qu'une étape avant l'envoie de votre commande");
    window.location.href = "formulaire.html";
  });
}
