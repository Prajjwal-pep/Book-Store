import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModels.js";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());  // enable CORS for all requests


// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send("I'm Back")
});




mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

app.use('/books', bookRoute);