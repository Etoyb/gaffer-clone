let rightSide = document.querySelector('.rightSide');
let teamNameInput = document.querySelector('.teamIn');
let emptyDiv = document.querySelector('.emptydiv')
const jerseyObject = {
    black: '/Teamkits/BLjersey.png',
    white: '/Teamkits/Wjersey.png',
    green: '/Teamkits/Gjersey.png',
    blue: '/Teamkits/Bjersey.png'
};

const shortObject = {
    black_shorts: '/Teamshorts/BLshorts.png',
    green_shorts: '/Teamshorts/Gshorts.png',
    white_shorts: '/Teamshorts/Wshorts.png',
    blue_shorts: '/Teamshorts/Bshorts.png'
};

let State = {
    teamName: null,
    teamJersey: null,
    teamShorts: null
}


// Handle jersey selection
document.querySelector('.imageContainer').addEventListener('click', event => {
    const className = event.target.className;
    if (!jerseyObject[className]) return;

    const jerseyPath = jerseyObject[className];

    State.teamJersey = jerseyPath
    Render();
    const key = Object.keys(jerseyObject).find(k =>  jerseyObject[k]=== jerseyPath)
    teamkits = key
});

document.querySelector('.shortsContainer').addEventListener('click', event => {
    const shortsName = event.target.className;
    if(!shortObject[shortsName]) return;

    let shortsPath = shortObject[shortsName];

     State.teamShorts = shortsPath
     Render();
     const key = Object.keys(shortObject).find(k => shortObject[k] === shortsPath);
     teamshorts = key
})

// Handle team name entry
document.querySelector('.entBtn').addEventListener('click', () => {
    const teamName = teamNameInput.value.trim();

    if (teamName.length > 20) {
        emptyDiv.textContent = "No more than 20 characters";
        return;
    }

    emptyDiv.textContent = "";

     State.teamName = `<p class="teamNamePreview">${teamName}</p>`;
     Render()
     teamname = teamName
});

let teamname = '';
let teamkits = '';
let teamshorts = '';
function Render() {
    let html = `<div class="theContainer"> <h1> Team Information</h1>`
    Object.entries(State).forEach(([Key, value]) => { 
        if (!value) return // skip all empty values

        if (Key === 'teamName') {
            html += `<p class="teamNamePreview"> ${value}</p>`
        }

        if (Key === 'teamJersey') {
            html += `<img src="${value}" class="previewJersey" `        }

        if (Key === 'teamShorts') {
            html += `<img src="${value}" class="shortsPreview" >`
        }

        html += `</div>`
        rightSide.innerHTML = html;

    })
}


document.querySelector('.saveButton').addEventListener('click', () => {
    fetch('http://localhost:3000/app/user/teamData', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({teamname,teamkits,teamshorts}),
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            location.reload()
            window.location.href = data.redirectUrl;
        } 
    }).catch (error => console.log('error',error) )
})
