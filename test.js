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
