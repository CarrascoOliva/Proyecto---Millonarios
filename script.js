const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];
  let newUser = {
    name: user.name.first +'' + user.name.last,
    money: Math.floor(Math.random() * 1000000)
  };

  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money

  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  userList.push(obj);
  updateDOM();
  console.log(userList);

}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  userList.forEach(user => {
    user.money *= 2;
  });
  updateDOM();
  console.log(userList);

  // TIP: Puedes usar map()
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
  console.log(userList);


  // TIP: Puedes usar sort()
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  userList = userList.filter(user => user.money > 1000000);
  updateDOM();
  console.log(userList);

  // TIP: Puedes usar filter()
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
// TIP: Puedes usar reduce ()
function calculateWealth() {
  let wealth = userList.reduce((total, user) => total + user.money, 0);
  main.innerHTML += `<h3>El dinero total es: ${formatMoney(wealth)}</h3>`;
  calculateWealthBtn.removeEventListener('click', calculateWealth);
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  while (main.childElementCount > 1) {
    main.removeChild(main.lastChild);
  }
  userList.forEach(user => {
    main.innerHTML += `<p class="name">${user.name}: ${formatMoney(user.money)}</p>`;
    console.log(user.money);
    console.log(user.name);
    console.log(main.innerHTML);
    console.log(userList);
    console.log(user);
  });
  calculateWealthBtn.addEventListener('click', calculateWealth);

  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';

}


// Obtenemos un usuario al iniciar la app
getRandomUser();

// TODO: Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
