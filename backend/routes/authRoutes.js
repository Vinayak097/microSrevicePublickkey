
import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { generateApiKey } from '../generateApikey.js';
import { authenticateToken } from '../middlewares/middleware.js';
import e from "express";
import {jenerateToken} from '../jenerateToken.js'
const router=e.Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const user=await User.findOne({email:email})
  
  if(user._id){
    return res.status(400).json({message:"user alerady exists"})
  }
  const password_hash = await bcrypt.hash(password, 10);
  const apiKey=await generateApiKey()
  const newUser = new User({ first_name, last_name, email, password_hash,apiKey });
  await newUser.save();
  const token=jenerateToken({email,id:newUser._id})
  res.status(201).json({message:'User registered successfully',token:token});
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jenerateToken({email,id:user._id});
  return res.status(200).json({ token });
});


router.post('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

export default router;

  