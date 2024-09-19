import express from 'express';
import {Book} from  '../models/bookModels.js';
import zod from 'zod';
const router = express.Router();

//route to post in the database
const addBookSchema = zod.object({
    title: zod.string(),
    author: zod.string(),
    publishYear: zod.number().min(1000).max(2024)
});

const updateBookSchema = zod.object({
    title: zod.string().optional(),
    author: zod.string().optional(),
    publishYear: zod.number().min(1000).max(2024).optional()
});

router.post('/', async(req, res) => {
    try {
        const {title, author, publishYear} = addBookSchema.parse(req.body);
        const book = new Book({
            title,
            author,
            publishYear
        });
        await book.save();
        return res.status(201).send({message: 'Book added successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.get('/',  async (req, res) => {
    try {
        const book = await Book.find({});
        return res.status(200).send({
            count: book.length,
            data: book
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
    
})

router.get('/:id',  async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, author, publishYear} = updateBookSchema.parse(req.body);
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        if(title) book.title = title;
        if(author) book.author = author;
        if(publishYear) book.publishYear = publishYear;
        await book.save();

        return res.status(200).send({message: "Book updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
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
        return res.status(500).send({message: error.message});
    }
})

export default router;