import express, { json } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
import publicroutes from './microservices/index.js'
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/Candidate.js';
import apiKeyRoutes from './routes/getApikey.js'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());


connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));


console.log(process.env.PORT,process.env.MONGO_URI)
app.use('/api/auth', authRoutes);       
app.use('/api/candidate', candidateRoutes);  
app.use('/api/key', apiKeyRoutes);  
app.use('/api/public',publicroutes)

app.listen(PORT, () => {
  console.log(`Main service running on port ${PORT}`);
});
