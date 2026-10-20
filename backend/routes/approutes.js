import express from 'express'
import { authMiddleware } from './auth.js';
const router = express.Router();
import path from 'path'; // <--- THIS WAS MISSING
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'
import { User } from './auth.js';

router.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));
router.use('/player-images', express.static(path.join(__dirname, '..', 'public', 'player-images')));

router.get('/teamCreate', authMiddleware, async(req, res) => {
    const username = req.user.user;
const filePath = path.join(__dirname, '..', 'public', 'teamCreate', 'createTeam.html');

  res.sendFile(filePath, (err) => {
      if (err) {
          console.error("File failed to send:", err);
          res.status(404).send("page file not found.");
      }
  });
});

router.get('/dashboard', authMiddleware, (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'renderHome', 'dashboard.html');

  res.sendFile(filePath, (err) => {
      if (err) {
          console.error("File failed to send:", err);
          res.status(404).send("Dashboard file not found.");
      }
  });
})
router.post('/teamData', authMiddleware,async (req, res) => {
    const {teamkits, teamshorts, teamname} = req.body;
    const username = req.user.user;
    const team = await User.findOne({username: username.trim()});
     
    const updatedData = await User.findOneAndUpdate (
        {username: username}, 
            {
                $set: {
                    teamname: teamname,
                    Jersey: teamkits,
                    kitShorts: teamshorts
                }
            },
            {returnDocument: 'after'}
    )

    return res.json({ 
        success: true, 
        redirectUrl: 'http://localhost:3000/app/user/dashboard',
    });
})

router.get('/userdata',authMiddleware, async (req,res) => {
    const user = req.user.user;

    const  userdata = await User.findOne( {
      username: user
    })

    const returnData = {
      teamname: userdata.teamname,
      Jersey:`${userdata.Jersey}_jersey`,
      shorts: userdata.kitShorts,
    }

    res.json(returnData)
   })

  router.post('/recieveplayers', authMiddleware, async (req, res) => {
    const {name,image,playerPos,playerrating, exactPos} = req.body
    const user = req.user.user
    
    const positionMap = {
      'goalkeeper':   'selectedPlayers.goalkeeper.goalkeeper',
      'left-back':    'selectedPlayers.defenders.leftback',
      'centre-back-1':'selectedPlayers.defenders.centreback1',
      'centre-back-2':'selectedPlayers.defenders.centreback2',
      'right-back':   'selectedPlayers.defenders.rightback',
      'defensive-mid':'selectedPlayers.midfelders.defensivemid' ,
      'central-mid-8':'selectedPlayers.midfelders.midfielder8' ,
      'central-mid-10':'selectedPlayers.midfelders.midfielder10' ,
      'winger-7':      'selectedPlayers.attackers.winger7',
      'winger-11':     'selectedPlayers.attackers.winger11',
      'striker':        'selectedPlayers.attackers.striker'
    }

    const positionname = positionMap[exactPos]
    const player = await User.findOne({
      username: user
    })

    const allPlayers = JSON.stringify(player.selectedPlayers)

    if (allPlayers.includes(`${name}`)){
      res.json(`${name} has already been selected`)
      return
    }
    const playersData = await User.findOneAndUpdate(
      {username : user}, 
        {
          $set: {
            [positionname]: {
              name,image,playerPos, playerrating
            }
          }
        }, {returnDocument: 'after'}
    )

  })

  router.get('/lineup', authMiddleware, async (req,res) => {
    const user = req.user.user

    const player = await User.findOne({
      username: user
    })


    const positionMap = {
      'goalkeeper':   'selectedPlayers.goalkeeper.goalkeeper',
      'left-back':    'selectedPlayers.defenders.leftback',
      'centre-back-1':'selectedPlayers.defenders.centreback1',
      'centre-back-2':'selectedPlayers.defenders.centreback2',
      'right-back':   'selectedPlayers.defenders.rightback',
      'defensive-mid':'selectedPlayers.midfelders.defensivemid' ,
      'central-mid-8':'selectedPlayers.midfelders.midfielder8' ,
      'central-mid-10':'selectedPlayers.midfelders.midfielder10' ,
      'winger-7':      'selectedPlayers.attackers.winger7',
      'winger-11':     'selectedPlayers.attackers.winger11',
      'striker':        'selectedPlayers.attackers.striker'
    }

    const reverseMap = Object.fromEntries(
      Object.entries(positionMap).map(
          ([frontendPath, databasePath]) => [
              databasePath, 
              frontendPath
          ]
      )

  );

  const selected = player?.selectedPlayers; // Safe navigation
  const result = [];
  
  if (selected) {
    for (const [groupKey, group] of Object.entries(selected)) {
      // Ensure the group is actually an object before looping
      if (!group || typeof group !== 'object') continue;
  
      for (const [posKey, playerObj] of Object.entries(group)) {
        // Validate player object and ensure it has a name
        if (!playerObj || !playerObj.name) continue;
  
        const fullPath = `selectedPlayers.${groupKey}.${posKey}`;
        const frontendPos = reverseMap[fullPath];
  
        // Optional: skip if the position mapping is completely missing
        if (!frontendPos) continue; 
  
        result.push({
          position: frontendPos,
          ...playerObj
        });
      }
    }
  }
  
res.json(result);
  })
export default router;
