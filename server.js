import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import test_routes from './routes/test_routes.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

//dot en configuration 
dotenv.config()

// db connection
connectDB();
// rest object
const app = express();


// middleware 

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/test',test_routes);
app.use('/api/v1/auth',authRoutes)
//http://localhost:5500
app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to Food server app</h1>");
});
// here we are passing the get http request in order to get it running on the server.

// port
const PORT = process.env.PORT|| 5500;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});
// the port is listening and also running which is showing the result as that statement.