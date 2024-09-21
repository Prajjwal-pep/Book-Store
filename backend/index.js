import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());


app.use(express.json());
app.use('/books', bookRoute);

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send("I'm Back")
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
