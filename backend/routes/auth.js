import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import path from 'path'; // <--- THIS WAS MISSING
import { fileURLToPath } from 'url';
import env from 'dotenv'
import mongoose from 'mongoose';
const Schema = mongoose.Schema


env.config()

router.use(express.json());
router.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));
router.use('/player-images', express.static(path.join(__dirname, '..', 'public', 'player-images')));



export const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    teamname: {
      type: String,
      default: ''
    },
    Jersey: {
      type: String,
      default: ''

    },
    kitShorts : {
      type: String,
      default: ''
    },

    selectedPlayers: {
      type: String,
      default: "",
      defenders: [],
      midfeolders: [],
      attackers: []
    }
})

usersSchema.methods.hasCompleteTeam = function() {
  return Boolean(
    this.teamname?.trim() && 
    this.Jersey?.trim() && 
    this.kitShorts?.trim()
  );
};

export const User = mongoose.model('User', usersSchema);
 

export function authMiddleware(req,res,next) {
    const token = req.cookies.authToken;
    if (!token) return res.redirect('https://gaffer-hub-frontend-v5bi.onrender.com/login.html')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
      if (err) {
         return res.redirect('https://gaffer-hub-frontend-v5bi.onrender.com/login.html');
      }
      req.user = decoded;
      next()
    })
}

 // reg router 
 router.post('/signin',async (req,res) => {
   const { username, password} = req.body
   if (!username || !password ) {
      return res.status(400).json('all fields required')
   } ;
  
   if (password.length < 6) {
      return res.status(400).json('password is not required length')
   };
  
   const hashpass = await bcrypt.hash(password,10);
  
   const newUser = new User({
     username:username,
     password:hashpass
   })

   await newUser.save();
   res.json('yh the username has been saved')
  });


   // login router 
   router.post('/login', async (req,res) => {
      const { username, password } = req.body;

    if (!username || !password ) {
       return res.status(400).json({message:'all fields required'})
    } ;

    const realUser = await User.findOne({ username: username.trim() });

    if (!realUser) return res.status(400).json({message:'username not found'})
   
      const isPasscorrect = await bcrypt.compare(password,realUser.password )
      if (!isPasscorrect) return res.status(401).json({message:'password is wrong'});

      let token = jwt.sign(
         {user: realUser.username},
         process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m'});

      res.cookie('authToken', token, {
         maxAge: 900000,
         httpOnly: true,
         secure: true,
         sameSite: 'none'
      });
  
      if (!realUser.hasCompleteTeam()) {
        return res.json({ 
          success: true, 
          redirectUrl: 'https://gaffer-hub-backend-yy35.onrender.com/app/user/teamCreate' 
        });
      }else {
        return res.json({ 
          success: true, 
          redirectUrl: 'https://gaffer-hub-backend-yy35.onrender.com/app/user/dashboard',
      });
      }
     
   });
 
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

export default router;