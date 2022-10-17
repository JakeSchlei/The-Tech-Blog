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

router.post('/', async (req, res) => {
    try {
        const dbUser = await User.create(
            req.body
        )
        res.json(dbUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const dbUser = await User.findOne({
            where: {
                username: req.body.username,
            }
        })
        if(!dbUser) {
            res.status(404).json('Username not found. Please try again or sign up.')
        }
        const pwValidate = dbUser.checkPassword(req.body.password);

        if(!pwValidate) {
            res.status(404).json('Incorrect password. Please try again.')
        }
        req.session.save(() => {
            req.session.userID = dbUser.id;
            res.json('You are now logged in!')
         })
    } catch (err) {
       console.log(err);
    }
});

// logout

module.exports = router;