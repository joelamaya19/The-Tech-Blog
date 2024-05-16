const router = require('express').Router();
const { Blog, Comment, User} = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: Comment }]
        });

        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

        res.render('dashboard', {
            ...blogs,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;