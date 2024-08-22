import User from '../models/userModel.js';



import e from "express";
import { authenticateToken } from '../middlewares/middleware.js';
const router=e.Router();
router.get('/getApiKey', authenticateToken, async (req, res) => {
    try {
      
      const user = await User.findOne({email:req.user.email});
      console.log(user)
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      
      res.status(200).send({ apiKey: user.apiKey });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

  export default router