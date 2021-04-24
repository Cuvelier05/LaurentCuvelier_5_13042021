// // Function ajout des articles au panier.
// function addItemCart (item) {

//     // variable tableaux
//     let cartItem = []

//     // stockage dans un objet
//     let saveItemCart = {
//         _id: item._id,
//         imageUrl: item.imageUrl,
//         name: item.name,
//         price: item.price,
//         quantity: 1,
//         selectColors: item.selectColors
//     }
//     let otherItem = true;
//     // Si sessionStorage est vide elle crée un nouveau tableau cartItem et l'enregistre dans le sessionStorage
//     if (sessionStorage.getItem('anyItem') === null) {
//         cartItem.push(saveItemCart);
//         sessionStorage.setItem('anyItem', JSON.stringify(cartItem));
//     }
//     // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
//     else {
//         cartItem = JSON.parse(sessionStorage.getItem('anyItem'));

//         cartItem.forEach((prod) => {
//             if (item._id === prod._id && item.selectColors === prod.selectColors) {
//                 prod.quantity++;
//                 otherItem = false;
//             }
//         })
//     if (otherItem) cartItem.push(saveItemCart);
//     sessionStorage.setItem('anyItem', JSON.stringify(cartItem));
// }

// itemConfirmation();
// alert("Vôtre produit a été ajouter au panier");
// }
// Récupération de la chaine de requête dans l'URL

// // Création de la condition SI il y a un produit dans le locale storage OU non
// let otherItem = true;
// if (localStorage.getItem('teddyBear') === null) {
//   addProductLocalStorage();
//   //  alertConfirmation() ;
// } else {
//   saveProductOnLocalStorage = JSON.parse(localStorage.getItem("teddyBear"));
//   saveProductOnLocalStorage.forEach((prod)=> {
//     if(teddieId === prod.idSelectedProduct && selectColor === prod.productOption){
//       prod.quantity++;
//       otherItem = false;}
//       // addProductLocalStorage();
//     })

//     // alertConfirmation() ;
//     if(otherItem) addProductLocalStorage();
//       console.log(otherItem);
//     };

// });

const queryStringUrlId = window.location.search;

// Extraire uniquement l'Id
const id_teddie = queryStringUrlId.slice(4);

// Affichage du produit qui a été sélectionné par l'Id
let response = fetch(`http://localhost:3000/api/teddies/${id_teddie}`)
  .then((data) => data.json())
  .then((productTeddieSelect) => {
    document.querySelector(".container_product").innerHTML = `
  <li class="teddie_card">
    <img class ="teddie_picture" src="${productTeddieSelect.imageUrl}" />
  
        <div class="teddie_information">
         <h2 class="teddie_name">${productTeddieSelect.name}</h2>
            <h3 class="teddie_price">${
              Number(productTeddieSelect.price / 100) + " €"
            }</h3>
              <p class="teddie_description">${
                productTeddieSelect.description
              }</p>
        </div>
  
        <form >
          <label for="product_option">Choisir la couleur</label>
          <select name ="select_option "id="choose_color">
          </select>
        </form>
        
        <button id="add_basket" type= "submit">Ajouter au panier</button>
  
  </li>
  `;

    //  Gérer les options que l'on présente
    const optionColors = productTeddieSelect.colors;
    let templateOption = [];

    // Création d'une boucle pour afficher les options
    for (let i = 0; i < optionColors.length; i++) {
      templateOption += `<option value="${optionColors[i]}">${optionColors[i]}</option>`;
    }

    // Intégrer les options au contenu HTML
    document.querySelector("#choose_color").innerHTML = templateOption;

    // --------------------------------------Gestion du panier--------------------------------------//
    // Recupération des données sélectionnées par l'utilisateur + envoie au panier

    // Sélection du bouton
    const btnAddBasket = document.querySelector("#add_basket");

    // Ajouter un évènement au bouton
    btnAddBasket.addEventListener("click", (e) => {
      e.preventDefault();
      //Selection du formulaire
      const idOption = document.getElementById("choose_color");

      // Récuperation choix de l'utilisateur dans une variable
      const selectColor = idOption.value;

      // Récupération des valeurs du formulaire
      let productCard = {
        productName: productTeddieSelect.name,
        idSelectedProduct: id_teddie,
        productOption: selectColor,
        quantity: 1,
        price: Number(productTeddieSelect.price / 100) + " €",
      };
      console.log(productCard);
      // --------------------------------------LE LOCAL STORAGE--------------------------------------//
      //Stocker les valeurs du formulaire dans le local storage:
      let saveProductOnLocalStorage = JSON.parse(
        localStorage.getItem("teddyBear")
      ); //=>convertir au format JSON avec la clé teddyBear

      //Création fenêtre de confirmation pour le produit + option sélectionné
      function alertConfirmation() {
        if (
          confirm(
            `Le produit ${productTeddieSelect.name} avec la couleur ${selectColor} a été ajouter au panier`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      }

      // Fonction permettant d'ajouter un produit sélectionné dans le local storage
      function addProductLocalStorage() {
        saveProductOnLocalStorage.push(productCard);
        localStorage.setItem(
          "teddyBear",
          JSON.stringify(saveProductOnLocalStorage)
        );
      }

      // Création de la condition SI il y a un produit dans le locale storage OU non
      if (saveProductOnLocalStorage) {
        addProductLocalStorage();
        alertConfirmation();
      } else {
        saveProductOnLocalStorage = [];
        addProductLocalStorage();
        alertConfirmation();
      }
    });
  });
