// OBJET NOUNOURS
// Classe qui va servir à l'assignation des data de mon API (objet Nounours)
class Teddies {
  constructor(jsonTeddies) {
    jsonTeddies && Object.assign(this, jsonTeddies);
  }
}

// APPEL DE L'API + MISE EN PAGE INDEX HTML

fetch("http://localhost:3000/api/teddies") // APPEL DE L API
  .then((data) => data.json()) // Récupération des données et convertion au format JSON
  .then((jsonListTeddies) => {
    // A partir de ma liste de nounours ...
    for (let jsonTeddies of jsonListTeddies) {
      // boucle:pour tout les nounours de la liste, je créé noounours indiv
      let teddie = new Teddies(jsonTeddies); // je créé ma variable nounours
      document.querySelector("#results").innerHTML +=
        // Intégration texte HTML
        `
  <li class="teddie_card">

    <img class ="teddie_picture" src="${teddie.imageUrl}" />

        <div class="teddie_information">
         <h2 class="teddie_name">${teddie.name}</h2>
            <h3 class="teddie_price">${Number(teddie.price / 100) + " €"}</h3>
              <p class="teddie_description">${teddie.description}</p>
        </div>

         <div class="teddie_button">
          <a href="produit.html?id=${teddie._id}"
            <span>Afficher le produit</span>
          </a>
         </div>

  </li>
  `;
    }
  });
