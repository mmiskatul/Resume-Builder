import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connecTotDb } from './config/db.js';
import userRouter from './routes/userRoutes.js';


// 
const app=express();
const PORT =process.env.PORT || 4000;

app.use(cors())

// CONNECT DB
connecTotDb()

// MIDDLEWARE
app.use(express.json());

app.use('/api/auth',userRouter);

// ROUTE
app.get('/',(req,res)=>{
    res.send('API WORKING...... ');
})

app.listen(PORT,()=>{
    console.log(`server is started on http://localhost:${PORT}`);
})