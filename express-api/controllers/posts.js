const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})


router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.id));
        //const books = await author.books;
        res.status(200).json(post);
    } catch (err) {
        res.status(500).send(err);
    };
});

router.post('/', async(req,res)=>{
    try {
        const post = await Post.create(req.body.title, req.body.name, req.body.body);
        res.status(201).json(post)
    } catch (err) {
        res.status(422).json({err})
    }
})


module.exports = router
