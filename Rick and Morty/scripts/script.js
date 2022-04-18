// async function datafromApisurl(url){
//     const result = fetch('https://rickandmortyapi.com/api/episode')
//     const resultbody = await(result)
//     return resultbody
//     console.log(result)
//     resultbody.forEach(element => {
//         console.log(`results ${element}`)
        
//     });
// }
function updatemainconatainer(id,name,date,episodecode){
    const title = document.createElement('h2');
    title.innerText = name;
    const mainareaElement =document.querySelector('.maindiv');
    mainareaElement.appendChild(title);

}


const root =document.querySelector('#root');

function maincontainer (){
    const maincontainerpage =document.createElement('div');
    maincontainerpage.className ="maindiv";
    maincontainerpage.innerText="this is mainarea";
    const heading =document.createElement('p');
    maincontainerpage.appendChild(heading);
    root.appendChild(maincontainerpage);

const images = document.createElement('image');
images.forEach(img =>{
    
    
    images.src ="https://rickandmortyapi.com/api/character/avatar/1.jpeg";
    
    const dateof = document.createElement('p');
    dateof.textContent = 'april 15,2022 |S01E1';

})
    


    //appending
    maincontainerpage.appendChild(images)
    
    
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
           updatemainconatainer(episode.id,episode.name,episode.air_date,episode.characters)

        })
        
    });  
})
.catch(error =>{
    console.error(error);
    const errormassege =document.createElement('h1');
    errormassege.innerText="there is a error in serverside";
    document.querySelector('body').appendChild(errormassege);
});
}




sidebar();
maincontainer();