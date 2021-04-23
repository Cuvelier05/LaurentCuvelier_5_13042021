// //Variables
// let teddyBear;
// let results = document.getElementById("results");
// let btn = document.querySelector("#showProduct");

// // API REQUEST  (Aller chercher les produits "nounours dans l'API")
// const fetchTeddyBear = async () => {
//   teddyBear = await fetch(`http://localhost:3000/api/teddies`).then((res) =>
//     res.json()
//   );
// };

// // Montrer les produits dans ma page HTML

// const showTeddyBear = async () => {
//   await fetchTeddyBear();

//   results.innerHTML = (
//     teddyBear
//     .map
//       (product =>(
//         `
//           <li class="product_item">
//              <img class ="product_picture" src="${product.imageUrl}" />
//              <div class="product_information">
//                <h2 class="product_name">${product.name}</h2>
//                  <h3 class="product_price">${product.price + ' ' + '€'}</h3>
//                    <p class="product_description">${product.description}</p>
//              </div>
//              <div class="product_button">
//              <a href="produit.html"
//              <span>Afficher le produit</span>
//              </a>
//              </div>
//           </li>
//         `
//     ))
//     .join("")
//   );
// };
// showTeddyBear();
