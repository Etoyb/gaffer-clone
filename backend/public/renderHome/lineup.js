const simplelineuptemp = document.body.innerHTML;
const endpoints = {
    Goalkeeper: 'http://localhost:3000/players?position=Keeper',
    Defenders:  'http://localhost:3000/players?position=Defender',
    Midfielder: 'http://localhost:3000/players?position=Midfielder',
    Attacker:   'http://localhost:3000/players?position=Attacker'
    
}

document.body.addEventListener('click', async event => {
    const target = event.target.classList;
    const exactPos = target[0]
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

    document.body.addEventListener ('click', async event  =>  {
      const clicked = event.target.closest('.card');
      if (!clicked) return
         const classed = clicked.dataset.player 
         if (!classed) return;
      
      const thePlayer = await players.find(p => p.name === classed);
    
      const name = thePlayer.name
      const image = thePlayer.img
      const playerPos = thePlayer.position
      const playerrating = thePlayer.rating
      const exactPos = target[0]

        fetch('http://localhost:3000/auth/recieveplayers', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,image,playerPos,playerrating, exactPos}),
          credentials: 'include',
        }).then( async response => {
          const data = await response.json() 
          if (response.ok ) {
            console.log('sucess', data)
          }
        }).catch(err => console.log('Error: ',err))
    })

    
});


