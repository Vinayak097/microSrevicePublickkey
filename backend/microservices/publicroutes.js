import { authenticateApiKey } from "../middlewares/apikeymiddleware.js";
import Candidate from "../models/Candidate.js";

import e from "express";
const router=e.Router()
router.post('/profile', authenticateApiKey, (req, res) => {
    const { first_name, last_name, email } = req.user;
    res.json({ first_name, last_name, email });
  });
  
  
  router.get('/candidate', authenticateApiKey, async (req, res) => {

    const candidates = await Candidate.find({ user_id: req.user._id });
    console.log(candidates)
    res.json(candidates);
  });

  export default router;