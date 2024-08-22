import express, { json } from 'express';
import dotenv from 'dotenv'
dotenv.config()

import publicApiRoutes from './publicroutes.js'

const app = express();


app.use(json());


app.use('/', publicApiRoutes);


export default app;
