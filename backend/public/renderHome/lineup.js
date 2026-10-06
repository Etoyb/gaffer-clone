const simplelineuptemp = document.body.innerHTML;
const endpoints = {
    Goalkeeper: 'https://gaffer-hub-backend-yy35.onrender.com/players?position=Keeper',
    Defenders:  'https://gaffer-hub-backend-yy35.onrender.com/players?position=Defender',
    Midfielder: 'https://gaffer-hub-backend-yy35.onrender.com/players?position=Midfielder',
    Attacker:   'https://gaffer-hub-backend-yy35.onrender.com/players?position=Attacker'
    
}

document.body.addEventListener('click', async event => {
    const target = event.target.classList;
    let position;


    const positionMap = {
      Attacker:['striker', 'winger-7', 'winger-11'],
      Midfielder:['central-mid-10', 'central-mid-8', 'defensive-mid'],
      Defenders:['right-back', 'left-back', 'centre-back-1', 'centre-back-2'],
      Goalkeeper:['goalkeeper']
    }
  
    for (const [posname, classArray] of Object.entries(positionMap)) {
      const matches = classArray.some(className => target.contains(className));
      if (matches) {
        position = posname;
        break;
      }
    }

    if (!position) return;
    const url = endpoints[position];

    const res = await fetch(url)
    const players = await res.json();

    console.log(url)
    console.log(players)

    const playerSelect = players.map(player => {
      return `
        <div class='card' data-player='${player.name}'>

          <div class='top'>
              <img src="${player.img}">
              <p class="rating">${player.rating} </p>
          </div>

          <div class="bottom">
            <p> ${player.name}</p>
            <p class="pos"> Position: ${player.position}</p>
          </div>

          </div>`
    }).join('');

    

    document.body.innerHTML = `
    <button class="SelectLineupHome"> Back</button>
     <div class="playerSelect"> 
    ${playerSelect}
    </div>`;

    document.body.addEventListener('click', event => {
      const clicked = event.target.closest('.card');
      if (!clicked) return
    
      const classed = clicked.dataset.player
      
      if (!classed) return;

    })

});


