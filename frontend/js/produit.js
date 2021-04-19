// Récupération de la chaine de requête dans l'URL
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
      templateOption += `<option value="${i}">${optionColors[i]}</option>`;
    }

    // Intégrer les options au contenu HTML
    document.querySelector("#choose_color").innerHTML = templateOption;

    // --------------------------------------Gestion du panier--------------------------------------//
    // Recupération des données sélectionnées par l'utilisateur + envoie au panier

    // Sélection du bouton
    const addBasket = document.querySelector("#add_basket");

    // Ajouter un évènement au bouton
    addBasket.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      //Selectiondu formulaire
      const idForm = document.getElementById("choose_color");

      // Récuperation choix de l'utilisateur dans une variable
      const selectColor = idForm.value;

      // Récupération des valeurs du formulaire
      let productOption = {
        productName: productTeddieSelect.name,
        idSelectedProduct: id_teddie,
        productOption: idForm,
        quantity: 1,
        price: Number(productTeddieSelect.price / 100) + " €",
      };
      console.log(productOption);
    });
  });

// --------------------------------------LE LOCAL STORAGE--------------------------------------//
