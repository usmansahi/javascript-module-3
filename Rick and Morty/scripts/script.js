let sidebarElement;
let mainAreaElement;
let characterCardsElement;
// adding location and name,type,dimension
function locationofCharacter(locationUrl) {
  fetch(locationUrl)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      console.log(json);
    });

  characterLoction = document.querySelector('.character-card');
  console.log(characterLoction);

  mainAreaElement.appendChild(characterLoction);

  // adding location
}
function renderCharacter(name, status, species, image, location) {
  const cardCharacterElement = document.createElement('div');
  cardCharacterElement.className = 'character-card';
  mainAreaElement.appendChild(cardCharacterElement);
  locationofCharacter(location.url);
  //Add image source
  const characterImageElement = document.createElement('img');
  characterImageElement.src = image;

  // Add name
  const characterNameElement = document.createElement('div');
  characterNameElement.innerText = name;
  //location
  const characterLocationElement = document.createElement('div');
  characterLocationElement.innerText = location.name;

  // Add specie and status
  const characterSpecieStatusElement = document.createElement('div');
  characterSpecieStatusElement.innerText = `${species} | ${status}`;

  cardCharacterElement.appendChild(characterImageElement);
  cardCharacterElement.appendChild(characterNameElement);
  cardCharacterElement.appendChild(characterSpecieStatusElement);
  cardCharacterElement.appendChild(characterLocationElement);
}

async function fetchcharacters(characterURLs) {
  //map all urls to fetch peomises
  const characterfetchPromises = characterURLs.map((characterURL) =>
    fetch(characterURL)
  );
  // transform the response into json objects
  const resolvedFetchResponses = await Promise.all(characterfetchPromises);
  // transform the response into json promises
  const jsonpromises = resolvedFetchResponses.map((resolvedFetchResponses) =>
    resolvedFetchResponses.json()
  );
  // transfor json promises into resolved json promise
  const resolvedJsonPromises = await Promise.all(jsonpromises);
  console.log(resolvedJsonPromises);
  resolvedJsonPromises.forEach((characterJson) =>
    renderCharacter(
      characterJson.name,
      characterJson.status,
      characterJson.species,
      characterJson.image,
      characterJson.location
    )
  );
}
// updatecontainer
function updatemainconatainer(name, date, episodecode, characterURLs) {
  mainAreaElement = document.querySelector('.maindiv');
  mainAreaElement.innerHTML = '';
  characterCardsElement.innerHTML = '';

  const title = document.createElement('h2');
  title.innerText = name;
  const releseDateAndCode = document.createElement('h3');
  releseDateAndCode.innerText = `${date} | ${episodecode}`;
  mainAreaElement.appendChild(title);
  mainAreaElement.appendChild(releseDateAndCode);
  mainAreaElement.appendChild(characterCardsElement);
  fetchcharacters(characterURLs);
}

function renderNextEpisodButton(nextUrl) {
  // rendring button
  if (!nextUrl) {
    return;
  }
  const nextbutton = document.createElement('button');
  nextbutton.className = 'next-list-button';
  nextbutton.innerText = 'Next Episode';
  nextbutton.addEventListener('click', (_event) => {
    console.log(nextUrl);
    fetch(nextUrl)
      .then((response) => response.json())
      .then((json) => {
        renderoflist(json.results, json.info.next);
      });
  });
  sidebarElement.appendChild(nextbutton);
}
function renderoflist(episodes, nextUrl) {
  //clean button inside sidebar
  document
    .querySelectorAll('.next-list-button')
    .forEach((buttonElement) => sidebarElement.removeChild(buttonElement));
  episodes.forEach((episode) => {
    const titleElement = document.createElement('p');
    titleElement.innerText = `episode ${episode.id}`;
    sidebarElement.appendChild(titleElement);
    titleElement.addEventListener('click', (_event) => {
      updatemainconatainer(
        episode.name,
        episode.air_date,
        episode.episode,
        episode.characters
      );
    });
  });
  renderNextEpisodButton(nextUrl);
}

//create sidebar nav
function sidebar() {
  sidebarElement = document.createElement('div');
  sidebarElement.id = 'sidenav';
  document.querySelector('#root').appendChild(sidebarElement);
  fetch('https://rickandmortyapi.com/api/episode')
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      renderoflist(json.results, json.info.next);
      //update maincontainer with first episode
      const firstEpisode = json.results[0];
      updatemainconatainer(
        firstEpisode.name,
        firstEpisode.air_date,
        firstEpisode.episode,
        firstEpisode.characters
      );
    });
}
//maincontainer
function maincontainer() {
  const mainAreaElement = document.createElement('div');
  mainAreaElement.className = 'maindiv';
  characterCardsElement = document.createElement('div');
  characterCardsElement.id = 'character-cards';
  mainAreaElement.appendChild(characterCardsElement);
  document.querySelector('#root').appendChild(mainAreaElement);
}
sidebar();
maincontainer();
// promise structure
const promiseFetch = new Promise((resolve, reject) => {
  // getting information by using url
  const response = 200;
  if (response !== 200) {
    reject(`Something went wrong, status code is not 200, it is: ${response}`);
  }
  resolve(response);
});
