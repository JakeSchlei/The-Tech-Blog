const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const findUsers = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(findUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
    const findOneUser = await User.findOne({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text_content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ],
        where: {
            id: req.params.id
        }
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new user

// login

// logout

module.exports = router;