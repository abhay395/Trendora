import express from 'express'
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middleware/error-handler.js'
import cors from 'cors';
import  connectDb from './db/connectdb.js'

// dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
// // app.use(errorHandlerMiddleware);
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });
app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello"})
})
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
connectDb()