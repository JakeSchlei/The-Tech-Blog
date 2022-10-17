const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
    const createComment = await Comment.create({
        include: [{
            model: User,
            attributes: ['username']
        }],
        text_content: req.body.text_content
    });
    res.json(createComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;