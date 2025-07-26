import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connecTotDb } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';


const _filename =fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);       
// Serve static files from the "uploads" directory
const uploadsPath = path.join(_dirname, 'uploads');
const staticMiddleware = express.static(uploadsPath);
const app = express();
app.use('/uploads', staticMiddleware);
// 
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