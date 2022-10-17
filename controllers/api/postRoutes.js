const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.findAll();
        res.json(dbPosts)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Comment,
                attributes: ['id', 'text_content', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });
        res.json(onePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
    const newPost = await Post.create({
        include: [{
            model: User,
            attributes: ['username']
        }],
        title: req.body.title,
        text_content: req.body.text_content,
        timestamps: req.body.timestamps
    });
    res.json(newPost);
    } catch (err)  {
        res.status(500).json(err);
    } 
});