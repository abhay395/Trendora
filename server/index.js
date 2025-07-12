import express from 'express'
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middleware/error-handler.js'
import cors from 'cors';
import connectDb from './db/connectdb.js'
import router from './routes/index.routes.js';

// dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',router)
app.use(errorHandlerMiddleware)
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
connectDb()