
let mainAreaElement;
function renderCharacter(name ,status, species, image){
    const cardCharacterElement = document.createElement('div');
    mainAreaElement.appendChild(cardCharacterElement);
    //Add image source
    const characterImageElement = document.createElement('img');
    characterImageElement.src = image;

    // Add name
    const characterNameElement = document.createElement('div');
    characterNameElement.innerText = name;

    // Add specie and status
    const characterSpecieStatusElement = document.createElement('div');
    characterSpecieStatusElement.innerText = `${species} | ${status}`;

    cardCharacterElement.appendChild(characterImageElement);
    cardCharacterElement.appendChild(characterNameElement);
    cardCharacterElement.appendChild(characterSpecieStatusElement);

}
 async function fetchcharacters(characterURLs) {
    //map all urls to fetch peomises
    const characterfetchPromises = characterURLs.map(characterURL => fetch(characterURL));
    // transform the response into json objects
    const resolvedFetchResponses = await Promise.all(characterfetchPromises);
     // transform the response into json promises
     const jsonpromises =resolvedFetchResponses.map(resolvedFetchResponses =>resolvedFetchResponses.json());
     // transfor json promises into resolved json promise
     const resolvedJsonPromises = await Promise.all(jsonpromises);
     console.log(resolvedJsonPromises);
     resolvedJsonPromises.forEach(characterJson =>renderCharacter(
        characterJson.name, characterJson.status, characterJson.species, characterJson.image));

}
// updatecontainer
function updatemainconatainer(name,date,episodecode,characterURLs){
    const mainareaElement =document.querySelector('.maindiv');
    mainareaElement.innerHTML='';
    const title = document.createElement('h2');
    title.innerText = name;
    const releseDateAndCode =document.createElement('p');
    releseDateAndCode.innerText = `${date} | ${episodecode}`;
    mainareaElement.appendChild(title);
    mainareaElement.appendChild(releseDateAndCode);

    fetchcharacters(characterURLs);
}

const root =document.querySelector('#root');
//maincontainer
function maincontainer (){
    const maincontainerpage =document.createElement('div');
    maincontainerpage.className ="maindiv";
    maincontainerpage.innerText="this is mainarea";
    const heading =document.createElement('p');
    maincontainerpage.appendChild(heading);
    root.appendChild(maincontainerpage);
   
}
//create sidebar nav
function sidebar(){   
fetch('https://rickandmortyapi.com/api/episode')
.then(result =>{
    return result.json()   
})
.then(json =>{
    console.log(json["results"])
    const sidebarnavigation = document.createElement('div');
    sidebarnavigation.className="sidenav";
    root.appendChild(sidebarnavigation);

    json.results.forEach(episode => {
        const titleepisode =document.createElement('p');
        titleepisode.innerText =`episode ${episode.id}`;
        sidebarnavigation.appendChild(titleepisode);
        titleepisode.addEventListener("click" , _event =>{
           updatemainconatainer(episode.name,episode.air_date,episode.episode, episode.characters);
        })   
    }); 
    const firstEpisode = json.results[0];
    updatemainconatainer(firstEpisode.name,firstEpisode.air_datefirstEpisode.episode, firstEpisode.characters); 

})

}
sidebar();
maincontainer();
// promise structure
const promiseFetch = new Promise((resolve, reject)=>{
    // getting information by using url
    const response = 200;
    if (response !== 200){
        reject(`Something went wrong, status code is not 200, it is: ${response}`);
    }
    resolve(response);
})