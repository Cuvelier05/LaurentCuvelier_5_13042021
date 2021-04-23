// window.addEventListener("DOMContentLoaded", fn)

// Split code into functions that have own responsabilities
// Avoid side effects into same function

//  --------------------Données des produits enregistrer dans le local storage-------------------------//
let saveProductOnLocalStorage = JSON.parse(localStorage.getItem("teddyBear"));

// --------------------AFfichage produit du panier-------------------------//
const showEmptyBasket = document.querySelector("#container_list_product");
const showFullBasket = document.querySelector("#show_basket_proudct");

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
  showEmptyBasket.innerHTML = emptyBasket;
}
//Affichage des produits choisis dans un tableau
else {
  let fullBasket = [];

  for (i = 0; i < saveProductOnLocalStorage.length; i++) {
    fullBasket += `
   <tr>
    <td class="product_basket">${saveProductOnLocalStorage[i].productName}</td>
      <td class = "option_basket">${saveProductOnLocalStorage[i].productOption}</td>
        <td class = "quantity_basket">${saveProductOnLocalStorage[i].quantity}</td>
          <td class = "price_basket">${saveProductOnLocalStorage[i].price} €</td>
            <td><button class = "delete_btn" >Supprimer</button> </td>
   <tr>
`;
  }

  if (i === saveProductOnLocalStorage.length) {
    showFullBasket.innerHTML = fullBasket;
  }
}

//  --------------------Création du bouton SUPPRIMER L ARTICLE-------------------------//
// let deleteProduct = document.querySelectorAll(".delete_btn");
// console.log(deleteProduct);

// for(let i = 0; i <deleteProduct; i++){
//   deleteProduct[i].addEventListener('click' , (e)=>{
//     e.stopPropagation;
//     e.preventDefault;
//   })
// }

//  --------------------Création du bouton SUPPRIMER LE PANIER-------------------------//
let deleteBasket = `   
<tr>
<th colspan="5"><button class = "deleteAll">Supprimer le panier</button></th>
</tr>
`;

showFullBasket.insertAdjacentHTML("beforeend", deleteBasket);

let deleteAll = document.querySelector(".deleteAll");
if (deleteAll) {
  deleteAll.addEventListener("click", (e) => {
    e.preventDefault;
    e.stopPropagation;
    localStorage.removeItem("teddyBear");
    alert("Vous avez supprimer votre panier");
    window.location.href = "panier.html";
  });
}

//  --------------------Calcul du prix total du panier-------------------------//
let totalBasketPrice = [1, 2, 3, 4];

if (saveProductOnLocalStorage) {
  for (i = 0; i < saveProductOnLocalStorage.length; i++) {
    let totalProductPrice = saveProductOnLocalStorage[i].price;

    totalBasketPrice.push(totalProductPrice);
  }
}

function summarize(acc, cur) {
  return Number.parseInt(acc) + Number.parseInt(cur);
}

const totalPrice = totalBasketPrice.reduce(summarize, 0);
console.log(totalPrice);

let basketPrice = `   
<tr>
<th colspan="5">Le prix total de votre panier est de ${totalPrice} €</th>
</tr>
`;

showFullBasket.insertAdjacentHTML("beforeend", basketPrice);
