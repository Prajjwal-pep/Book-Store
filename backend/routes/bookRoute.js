import express from 'express';
import {Book} from  '../models/bookModels.js';

const router = express.Router();

//route to post in the database
router.post('/', async(req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {return  res.status(400).send({message: 'Please provide all the info.'})};
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({meassage: error.message});
    }
})

//route to get all the books from database
router.get('/',  async (req, res) => {
    try {
        const book = await Book.find({});
        return res.status(200).send({
            count: book.length,
            data: book
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//route  to get a book by id
router.get('/:id',  async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//route to update a book
router.put('/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){ return  res.status(400).send({message: 'Please provide all the info.'})};
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
        return res.status(404).json({message: 'Book not found'});
    }
        return res.status(200).send({message:  'Book updated successfully'});


    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send({message:  "Book deleted successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

export default router;