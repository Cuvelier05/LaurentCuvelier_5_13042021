// **************************************************VARIABLE**************************************************\\
//  Données des produits enregistrer dans le local storage
let saveProductOnLocalStorage = JSON.parse(localStorage.getItem("product"));

// AFfichage produit du panier
const displayEmptyBasket = document.querySelector("#container_list_product");
const displayFullBasket = document.querySelector("#show_basket_prouduct");

// **************************************************FONCTIONS PRINCIPALES**************************************************\\
//  --------------------Création / Affichage de la commande-------------------------//
// *****CONDITION*****
// Si le panier est vide
function showCommand() {
  if (saveProductOnLocalStorage === null) {
    let emptyBasket = `
  <table id="empty_title" align = center>
   <thead>
    <tr>
     <th>Le panier est vide</th>
    </tr>
   </thead>
  </table>
  `;
    displayEmptyBasket.innerHTML = emptyBasket;
  } else {
    //Affichage des produits choisis dans un tableau
    let fullBasket = [];
    for (i = 0; i < saveProductOnLocalStorage.length; i++) {
      fullBasket += `
          <tr>
            <td class="product_basket">${saveProductOnLocalStorage[i].name}</td>
              <td  class="option_basket">${saveProductOnLocalStorage[i].option}</td>
                  <td  class="price_basket">${saveProductOnLocalStorage[i].price} €</td>
          <tr>
      `;
    }
    if (i === saveProductOnLocalStorage.length) {
      displayFullBasket.innerHTML = fullBasket;
    }
  }
}
showCommand();
//  --------------------Création du bouton SUPPRIMER LE PANIER-------------------------//

function deleteCommandBtn() {
  let deleteBasket = `   
    <tr>
    <td colspan="5" class="padding_case"><a class = "deleteAll">Supprimer le panier</a></td>
    </tr>
  `;

  displayFullBasket.insertAdjacentHTML("beforeend", deleteBasket);

  let deleteAll = document.querySelector(".deleteAll");
  if (deleteAll) {
    deleteAll.addEventListener("click", (e) => {
      e.preventDefault;
      e.stopPropagation;
      localStorage.removeItem("product");
      localStorage.removeItem("totalPriceCommand");
      alert("Vous avez supprimer votre panier");
      window.location.href = "panier.html";
    });
  }
}
deleteCommandBtn();
//  --------------------Calcul du prix total du panier-------------------------//
function totalPriceCommand() {
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

  localStorage.setItem("totalPriceCommand", JSON.stringify(totalPrice));
  let basketPrice = `   
<tr>
<td colspan="5"><p>Le prix total de votre panier est de ${totalPrice} €</span></p></td>
</tr>
`;

  displayFullBasket.insertAdjacentHTML("beforeend", basketPrice);
}
totalPriceCommand();
//  --------------------Création du bouton VALIDER LE PANIER-------------------------//
function validCommandBtn() {
  let confirmBasket = `   
    <tr>
    <td colspan="5" class="padding_case"><a class ="confirmBtn">Valider le panier</a></td>
    </tr>
  `;

  displayFullBasket.insertAdjacentHTML("beforeend", confirmBasket);

  let confirmBtn = document.querySelector(".confirmBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault;
      e.stopPropagation;
      window.location.href = "formulaire.html";
    });
  }
}
validCommandBtn();
