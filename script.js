console.log('Heloo');
let news = [];

let statistic;

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

getTopPlayers();

async function getPlayerById(id) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`,
  );

  const data = await response.json();
  console.log(data.players[0].idWikidata);
  const career = await getPlayerCareer(data.players[0].idWikidata);
  console.log(`EVE me nacionalen timu : ${career.national.caps}`);
  // console.log(data.player[0]);
  renderPlayer(data.players[0], career);

  const parts = data.players[0].strPlayer.split(' ');
  const searchName = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  // getPlayerByNameAndTeam(searchName, data.players[0].strTeam);
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
    console.log(id);
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

function renderPlayer(player, career) {
  const careerHTML = career.clubs
    .map(
      (c) => `
      <div class="club-item">
        <span class="year">${c.start.split('-')[0]} - ${c.end.split('-')[0] ?? 'Now'}</span>
        <span class="club">${c.club}</span>
      </div>
    `,
    )
    .join('');
  document.querySelector('.players-section-container').innerHTML =
    `<div class="player-info-card">
        <div class="player-profile">
          <img src="${player.strThumb}" />
          <h3>${player.strPlayer}</h3>
          <span>${player.strNationality}</span>
        </div>

        <div class="player-info">
          <p>Club: ${player.strTeam}</p>
          <p>Number:${player.strNumber}
          <p>Age: ${player.dateBorn}</p>
          <p>Position: ${player.strPosition}</p>
          <p>Transfer Fee: ${player.strSigning}</p>
          <p>Height: ${player.strHeight}</p>
          <p>Weight: ${player.strWeight}</p>


        </div>
      </div>
      <div class="player-description">
        <div class="desc-header">
          <h3>Player Report</h3>
        </div>

        <p class="bio">
          ${player.strDescriptionEN}
        </p>

        <div class="traits">
          <h4>Key Traits</h4>

          <span>✔ Dribbling</span>
          <span>✔ Pace</span>
          <span>✔ Vision</span>
          <span>✔ Creativity</span>
        </div>

        <div class="status">
          <h4>Status</h4>

          <p><span>Foot:</span> Left</p>
          <p><span>Work Rate:</span> High</p>
          <p><span>Potential:</span> World Class</p>
        </div>
      </div>

      <div class="career-card">
        <!-- HEADER -->
        <div class="career-header">
          <h3>Career Overview</h3>
        </div>

        <!-- CLUBS TIMELINE -->
        <div class="career-clubs">
          <h4>Clubs</h4>
         ${careerHTML}
        </div>

        <!-- STATS -->
        <div class="career-stats">
          <h4>Career Stats</h4>

          <div class="stat">
            <span>Matches</span>
            <span>450</span>
          </div>

          <div class="stat">
            <span>Goals</span>
            <span>300</span>
          </div>

          <div class="stat">
            <span>Assists</span>
            <span>120</span>
          </div>
           <div class="career-stats">
          <h4>National Team</h4>
           <div class="stat">
            <span>Caps:</span>
            <span>${career.national.caps}
          </div>
          <div class="stat">
            <span>Goals:</span>
            <span>${career.national.goals}
          </div>
        </div>
      </div>`;
}

// async function getPlayerCareer(wikidataId) {
//   const endpoint = 'https://query.wikidata.org/sparql';

//   const query = `
//     SELECT ?teamLabel ?start ?end WHERE {
//       wd:${wikidataId} p:P54 ?membership .
//       ?membership ps:P54 ?team ;
//                   pq:P580 ?start .
//       OPTIONAL { ?membership pq:P582 ?end . }

//       SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
//     }
//     ORDER BY ?start
//   `;

//   const url = endpoint + '?query=' + encodeURIComponent(query);

//   console.log('📡 SPARQL URL:', url);

//   const res = await fetch(url, {
//     headers: {
//       Accept: 'application/sparql-results+json',
//     },
//   });

//   console.log('📥 Response status:', res.status);

//   const data = await res.json();

//   console.log('📊 RAW DATA from Wikidata:', data);

//   const career = data.results.bindings.map((item) => ({
//     club: item.teamLabel.value,
//     start: item.start.value,
//     end: item.end ? item.end.value : 'Present',
//   }));

//   console.log('⚽ PARSED CAREER:', career);

//   return career;
// }

async function getPlayerCareer(wikidataId) {
  const endpoint = 'https://query.wikidata.org/sparql';

  const query = `
    SELECT ?teamLabel ?start ?end WHERE {
      wd:${wikidataId} p:P54 ?membership .
      ?membership ps:P54 ?team ;
                  pq:P580 ?start .

      OPTIONAL { ?membership pq:P582 ?end . }

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY ?start
  `;

  const url = endpoint + '?query=' + encodeURIComponent(query);

  const res = await fetch(url, {
    headers: {
      Accept: 'application/sparql-results+json',
    },
  });

  const data = await res.json();

  const clubs = data.results.bindings.map((item) => ({
    club: item.teamLabel.value,
    start: item.start.value,
    end: item.end ? item.end.value : 'Present',
  }));

  // 👉 SECOND QUERY for NATIONAL TEAM STATS
  const statsQuery = `
    SELECT ?caps ?goals WHERE {
      OPTIONAL { wd:${wikidataId} wdt:P1350 ?caps . }
      OPTIONAL { wd:${wikidataId} wdt:P1351 ?goals . }
    }
  `;

  const statsRes = await fetch(
    endpoint + '?query=' + encodeURIComponent(statsQuery),
    {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    },
  );

  const statsData = await statsRes.json();

  const stats = statsData.results.bindings[0] || {};

  return {
    clubs,
    national: {
      caps: stats.caps?.value || 0,
      goals: stats.goals?.value || 0,
    },
  };
}

async function getTeamId(teamName) {
  const url = `https://v3.football.api-sports.io/teams?search=${teamName}`;

  console.log('Searching team:', teamName);

  const res = await fetch(url, {
    headers: {
      'x-apisports-key': '1fc29c04b472ce79bc074477487d8ece',
    },
  });

  const data = await res.json();

  console.log('TEAM RESPONSE:', data);

  const team = data.response?.[0]?.team;

  if (!team) {
    console.log('No team found');
    return null;
  }

  console.log('TEAM ID:', team.id);

  return team.id;
}

async function getPlayerByNameAndTeam(playerName, teamName) {
  const normalize = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '');

  const cleanPlayer = normalize(playerName);
  const cleanTeam = normalize(teamName);

  console.log('Searching:', cleanPlayer, cleanTeam);

  const teamRes = await fetch(
    `https://v3.football.api-sports.io/teams?search=${cleanTeam}`,
    {
      headers: {
        'x-apisports-key': '1fc29c04b472ce79bc074477487d8ece',
      },
    },
  );

  const teamData = await teamRes.json();
  const teamId = teamData.response?.[0]?.team?.id;

  console.log('Team ID:', teamId);

  if (!teamId) return null;

  const playerRes = await fetch(
    `https://v3.football.api-sports.io/players?search=${cleanPlayer}&team=${teamId}`,
    {
      headers: {
        'x-apisports-key': '1fc29c04b472ce79bc074477487d8ece',
      },
    },
  );

  const data = await playerRes.json();

  console.log('Player result:', data);

  statistic = data.response?.[0];
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${cleanPlayer}-${cleanTeam}.json`;
  a.click();
  return data.response?.[0] || null;
}
