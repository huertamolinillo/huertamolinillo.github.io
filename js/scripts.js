/*!
 * Start Bootstrap - Landing Page v6.0.1 (https://startbootstrap.com/theme/landing-page)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

const logginForm = document.querySelector('#logginForm');
const app = document.querySelector('#app');
const appsSection = document.querySelector('#apps-section');
const masthead = document.querySelector('#masthead');
const wellcome = document.getElementById('wellcome');
const avatar = document.getElementById('avatar');

logginForm.addEventListener('submit', function (event) {
  console.log('logginForm...');
  event.preventDefault();

  let username = document.querySelector('#username').value;
  if (username.trim().length == 0) {
    alert('Por favor, introduce tu usuario.');
    return;
  }

  const user = _.find(users, { username: username });

  if (!user) {
    alert(
      'Este usuario no existe. Por favor, revise sus credenciales o contacte con el administrador.'
    );
    return;
  }

  addAvatar(user);

  const userApps = _.filter(apps, (app) => _.includes(user.apps, app.id));
  console.log('apps', userApps);

  if (userApps.length === 0) {
    alert('Actualmente no tienes acceso a ninguna applicación.');
    return;
  }

  // Remove every child node
  document.getElementById('apps-container').innerHTML = '';

  // The user has apps. Display this section (remove class d-none)
  appsSection.classList.remove('d-none');
  // Loop for every app the user has access
  userApps.forEach((app) => {
    addApp(app.url, app.icon, app.title, app.description);
  });
});

/**
 *
 * @param {*} user
 */
function addAvatar(user) {
  console.log('addAvatar...');

  // Remove wellcome component
  wellcome.innerHTML = '';

  const cloneAvatar = avatar.cloneNode(true);

  const imgNode = cloneAvatar.getElementsByTagName('img')[0];
  imgNode.setAttribute('src', user.avatar);

  const nameNode = cloneAvatar.getElementsByTagName('h1')[0];
  nameNode.innerHTML = 'Hola ' + user.name;

  const quoteNode = cloneAvatar.getElementsByTagName('p')[0];
  const authorNode = cloneAvatar.getElementsByTagName('p')[1];
  getQuote().then((quote) => {
    quoteNode.innerHTML = "\"" + quote.text + "\"";
    authorNode.innerHTML = (quote.author) ? "-- " + quote.author + " --" : "";
  });

  wellcome.appendChild(cloneAvatar);
}

/**
 *
 * @returns
 */
async function getQuote() {
  const response = await fetch('https://type.fit/api/quotes');
  const quotes = await response.json();
  console.log(quotes);
  const pos = parseInt(Math.random() * quotes.length, 10);
  return quotes[pos];
}

/**
 *
 * @param {*} link
 * @param {*} icon
 * @param {*} title
 * @param {*} description
 */
function addApp(link, icon, title, description) {
  console.log('addApp...');

  // Clone app with child nodes
  const cloneApp = app.cloneNode(true);

  // Set Link
  const linkNode = cloneApp.getElementsByTagName('a')[0];
  linkNode.setAttribute('href', link);

  // Set Icon
  const iconNode = cloneApp.getElementsByTagName('i')[0];
  iconNode.classList.remove('bi-window');
  iconNode.classList.add(icon);

  // Set title
  const titleNode = cloneApp.getElementsByTagName('h3')[0];
  titleNode.innerHTML = title;

  // Set description
  const descriptionNode = cloneApp.getElementsByTagName('p')[0];
  descriptionNode.innerHTML = description;

  document.getElementById('apps-container').appendChild(cloneApp);
}
