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
        redirectUrl: 'https://localhost:3000/app/user/dashboard',
    });
})

export default router;
