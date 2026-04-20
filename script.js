console.log('Heloo');
let news = [];

let teams = [];
countries = [];
function getCountry() {
  fetch('https://restcountries.com/v2/name/portugal')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data[0]);
      console.log('aaaaaaaaaaaaaaaaa');
      countries.push(data[0]);
    });
}

getCountry();

function getTeams() {
  fetch(
    'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League',
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      teams = [...data.teams];
      console.log(teams);
    });
}

// getTeams();

//Coding Challenge

async function getTam() {
  try {
    const response = await fetch(
      'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League',
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getTam();

let x = [1, 2, 3].join('');
console.log(x);

function renderNews(items) {
  document.querySelector('.news-feed').innerHTML = items
    .map(
      (item) => `
      <div class="item-news">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <p>${item.author}</p>
      </div>
    `,
    )
    .join('');
}
async function getNews() {
  const rssUrl = 'https://www.espn.com/espn/rss/soccer/news';

  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`,
  );

  const data = await response.json();
  console.log(data.items);
  console.log(data.items[0]);
  news = data.items.slice(0, 4);
  renderNews(news);
}

getNews();

function renderTopPlayers(items) {
  document.querySelector('.player-cards-container').innerHTML = items
    .map(
      (item) =>
        `<div class="player-card">
      <div class="player-img">
      <img src="${item.image}"/>
      </div>
      <p>${item.player}</p>
      <p>${item.age}</p>
      <p>${item.market_value_eur}</p>
      </div>
    `,
    )
    .join('');
}
function renderTopPlayers(items) {
  document.querySelector('.player-cards-container').innerHTML = items
    .map(
      (item) =>
        `<div class="player-card" data-id="${item.id}">
          <div class="player-img">
            <img src="${item.image}" />
          </div>

          <div>
            <p class="player-name">${item.player}</p>
            <p class="player-meta">${item.club}</p>
            <p class="player-meta">${item.age} yrs</p>
            <p class="player-meta">€${(item.market_value_eur / 1000000).toFixed(0)}M</p>
          </div>
        </div>
      `,
    )
    .join('');
}

async function getTopPlayers() {
  const response = await fetch('./Data/players.json');
  const data = await response.json();
  console.log(data);
  renderTopPlayers(data);
}

console.log('aaaaaaaaa');
getTopPlayers();
async function getPlayerById(id) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`,
  );

  const data = await response.json();
  console.log(data.players[0]);
  // console.log(data.player[0]);
}

function setActive(id) {
  document
    .querySelectorAll('.item')
    .forEach((item) => item.classList.remove('active'));
  const activeItem = document.getElementById(id);
  activeItem.classList.add('active');
}
document
  .querySelector('.player-cards-container')
  .addEventListener('click', (e) => {
    const id = e.target.closest('.player-card').dataset.id;
    getPlayerById(id);
    setActive('players');
    document.querySelector('.home-container').style.display = 'none';
  });

// async function getPlayerById(id) {
//   const response = await fetch(
//     `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`,
//   );

//   const data = await response.json();
//   console.log(data);
// }
