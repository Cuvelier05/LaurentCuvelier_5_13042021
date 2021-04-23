// Adress URL de base
const BASE_URL = "http://localhost:3000/api/teddies";
// Récupération de la chaine de requête dans l'URL
const queryString = new URLSearchParams(window.location.search);
// Extraire uniquement l'Id
const teddieId = queryString.get("id");

window.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Appel de l' API (en fonction du produit choisi)
function initApp() {
  fetch(`${BASE_URL}/${teddieId}`)
    .then((data) => data.json())
    .catch((error) => console.log(error.message))
    .then((data) => {
      if (data) {
        showTeddie(data);
        teddieOption(data);
      }
    });
}

// Affichage du produit selectionné
function showTeddie(teddiesData) {
  document.querySelector(".container_product").innerHTML = `
    <li class="teddie_card">
      <img class ="teddie_picture" src="${teddiesData.imageUrl}" />
          <div class="teddie_information">
            <h2 class="teddie_name">${teddiesData.name}</h2>
                <h3 class="teddie_price">${teddiesData.price / 100} €</h3>
                  <p class="teddie_description">${teddiesData.description}</p>
          </div>      
      <form >
          <label for="product_option">Choisir la couleur</label>
            <select name ="select_option "id="choose_color"></select>
      </form>
      <button id="add_basket" type= "submit">Ajouter au panier</button>      
    </li>
  `;
}

// Options de chaque produit
function teddieOption(teddiesData) {
  const optionColors = teddiesData.colors;
  let optionArray = [];
  for (let i = 0; i < optionColors.length; i++) {
    optionArray += `<option value="${optionColors[i]}"> ${optionColors[i]} </option>`;
  }
  document.querySelector("#choose_color").innerHTML = optionArray;
}
