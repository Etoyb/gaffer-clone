import { template } from "./template.js";

// placeholder variables for data we haven't got yet
let jersey = null;
let name = null

// fetching data from the backend 
fetch('http://localhost:3000/auth/userData').then( async response => {
     const  data = await response.json();
    if (response.ok) {
        const destruct = data.teamname;
         name = destruct
        if (data.Jersey === 'green_jersey') {
            jersey = '/Teamkits/Gjersey.png'
        } else if (data.Jersey === 'white_jersey') {
            jersey = '/Teamkits/Wjersey.png'
        } else if (data.Jersey === 'black_jersey') {
            jersey = '/Teamkits/BLjersey.png'
        } else if (data.Jersey === 'blue_jersey') {
            jersey = '/Teamkits/Bjersey.png'
        }
            
        document.querySelector('.team').innerHTML = `
         <img src="${jersey}" class="kitimg">
        <p> ${destruct}</p>
        `
    }
}).catch(error => console.log('error:', error))

let reverter = document.body.innerHTML;


document.addEventListener('click', (event) => {
    
    // check if the back button was clicked
    if (event.target.classList.contains('back')) {
        document.body.innerHTML = template.revert;
        document.querySelector('.team').innerHTML = `
        <img src="${jersey}" class="kitimg">
       <p>${name} </p>`
        return; // Stop here so it doesn't trigger the next IF
        
    } 


    if (event.target.closest('.stats')){
        document.body.innerHTML = template.statsTable;
    };
    
    if (event.target.closest('.lineup')) {
        document.body.innerHTML = template.lineup;
        reverter = document.body.innerHTML; 
    }

    // getting data from backend
    fetch('http://localhost:3000/auth/userData').then( async response => {
        const  data = await response.json();
       if (response.ok) {
           const destruct = data.teamname;

           document.querySelector('.teamsName').innerHTML = `
           <img src="${jersey}" class="kitimg">
           <p> ${destruct}</p>`
           
       }
    }).catch(error => console.log('error:', error))

    
    if (event.target.classList.contains('SelectLineupHome')) {
        document.body.innerHTML = reverter;
        document.querySelector('.team').innerHTML = `
        <img src="${jersey}" class="kitimg">
       <p>${name} </p>`
        return; // Stop here so it doesn't trigger the next IF
        
    } 
});

