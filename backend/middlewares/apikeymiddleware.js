
import User from "../models/userModel.js";


export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.header('Authorization');
  console.log(apiKey)
  const user = await User.findOne({ apiKey });
  if (!user) return res.status(401).send('Invalid API key');

  req.user = user;
  next();
};
