//  --------------------Données des produits enregistrer dans le local storage-------------------------//
let saveProductOnLocalStorage = JSON.parse(localStorage.getItem("teddyBear"));


// --------------------AFfichage produit du panier-------------------------//
const showEmptyBasket = document.querySelector("#container_list_product");
const showFullBasket = document.querySelector("#show_basket_proudct")


// Si le panier est vide
if(saveProductOnLocalStorage === null){
  let emptyBasket = 
  `
  <table align = center>
   <thead>
    <tr>
     <th>Le panier est vide</th>
    </tr>
   </thead>
  </table>
  `
  showEmptyBasket.innerHTML = emptyBasket;
}
//Affichage des produits choisis dans un tableau
else{
  let fullBasket = [];
 
  for(i = 0; i < saveProductOnLocalStorage.length; i++){
    fullBasket += 
`
   <tr>
    <td class="product_basket">${saveProductOnLocalStorage[i].productName}</td>
      <td class = "option_basket">${saveProductOnLocalStorage[i].productOption}</td>
        <td class = "quantity_basket">${saveProductOnLocalStorage[i].quantity}</td>
          <td class = "price_basket">${saveProductOnLocalStorage[i].price} €</td>
            <td><button class = "delete_btn" >Supprimer</button> </td>
   <tr>
`;
}

if(i == saveProductOnLocalStorage.length){
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

showFullBasket.insertAdjacentHTML("beforeend" , deleteBasket);

let deleteAll = document.querySelector(".deleteAll")

deleteAll.addEventListener('click' , (e)=>{
  e.preventDefault;
  e.stopPropagation;
  localStorage.removeItem("teddyBear");
  alert('Vous avez supprimer votre panier');
  window.location.href = "panier.html";
})

//  --------------------Calcul du prix total du panier-------------------------//
let totalBasketPrice = [];

for(i = 0; i < saveProductOnLocalStorage.length; i++){

    let totalProductPrice = saveProductOnLocalStorage[i].price;

    totalBasketPrice.push(totalProductPrice)
    };

const reducer = (accumulator , currentValue) => accumulator + currentValue;
const totalPrice = totalBasketPrice.reduce(reducer);
console.log(totalPrice);

let basketPrice = `   
<tr>
<th colspan="5">Le prix total de votre panier est de ${totalPrice} €</th>
</tr>
`;

showFullBasket.insertAdjacentHTML("beforeend" , basketPrice);
    


