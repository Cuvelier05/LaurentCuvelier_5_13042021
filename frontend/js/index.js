// **************************************************VARIABLE**************************************************\\
// Adresse URL de base
const BASE_URL = "http://localhost:3000/api";

// *********************************************FONCTION CHARGEMENT*********************************************\\
// Appel d'un évenement (affichage de la page quand le DOM sera chargé)
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// *********************************************FONCTIONS PRINCIPALES*********************************************\\
// Appel de l'Api(nounours) + traitement des erreurs + appel fonction pour afficher html
function initApp() {
  fetch(`${BASE_URL}/teddies`)
    .then((data) => data.json())
    .catch((error) => console.log(error))
    .then((data) => {
      if (data) {
        populateTeddies(data);
      }
    });
}

// Affichage dans ma page HTML
function populateTeddies(teddiesData) {
  if (Array.isArray(teddiesData)) {
    // boucle:pour tout les nounours de la liste, je créé noounours indiv
    teddiesData.forEach((teddie) => {
      document.querySelector("#results").innerHTML +=
        // Intégration texte HTML
        `
            <li class="teddie_card">
              <img class ="teddie_picture" src="${
                teddie.imageUrl
              }" alt="photo de nounours"/>
              <div class="teddie_information">
                <h2 class="teddie_name">${teddie.name}</h2>
                  <h3 class="teddie_price">${
                    Number(teddie.price / 100) + " €"
                  }</h3>
                  <p class="teddie_description">${teddie.description}</p>
              </div>
              
                <a href="produit.html?id=${teddie._id}" class="teddie_button"
                  <span>Afficher le produit</span>
                </a>
              
            </li>
          `;
    });
  }
}
