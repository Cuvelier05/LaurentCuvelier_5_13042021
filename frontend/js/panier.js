// let response = fetch(`http://localhost:3000/api/teddies/${id_teddie}`)
//   .then((data) => data.json())
//   .then((productTeddieSelect) => {
let saveProductOnLocalStorage = JSON.parse(localStorage.getItem("teddyBear"));

//   };
console.log(saveProductOnLocalStorage);