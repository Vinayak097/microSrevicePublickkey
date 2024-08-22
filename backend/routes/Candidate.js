import Candidate from "../models/Candidate.js";
import e from "express";
const router=e.Router();
import { authenticateToken } from "../middlewares/middleware.js";
router.post('/create', authenticateToken, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const newCandidate = new Candidate({
    first_name,
    last_name,
    email,
    user_id: req.user.id,
  });
  await newCandidate.save();
  res.status(201).json({message:'Candidate added successfully',candidate:newCandidate});
});


router.get('/get', authenticateToken, async (req, res) => {
  const candidates = await Candidate.find({ user_id: req.user.id });
  res.json(candidates);
});

export default router
