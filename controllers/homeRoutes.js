const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name'] }]
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

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment, include: [{ model: User, attributes: ['name'] }] }
            ]
        });

        const blogs = blogData.get({ plain: true });

        res.render('blogs', {
            ...blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});

module.exports = router;