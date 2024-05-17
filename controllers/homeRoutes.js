const router = require('express').Router();
const { Blog, Comment, User} = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name']}]
        });

        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('blogs/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{model: User, attributes: ['name']},{model: Comment}]
        });

        const blogs = blogData.get({plain: true});

        res.render('blog', {
            ...blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;