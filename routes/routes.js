//--Requirements--\\
const express = require('express')
const router = express.Router();



//controller
const article_controller = require('../controllers/article_controller');
const about_controller = require('../controllers/about_controller');
const book_controller = require('../controllers/book_controller')


//__DASHBOARD__\\
// GET Article home page
router.get('/', article_controller.index);


//__Article__\\
// GET request for creating an Article
router.get('/article/create', article_controller.article_create_get);

// POST request for creating an Article
router.post('/article/create', article_controller.article_create_post);

// GET request to delete Article
router.get('/article/:id/delete', article_controller.article_delete_get);

// POST request to delete Article
router.post('/article/:id/delete', article_controller.article_delete_post);

// GET request to update Article
router.get('/article/:id/update', article_controller.article_update_get);

// POST request to update Article
router.post('/article/:id/update', article_controller.article_update_post);

// GET request for single Article
router.get('/article/:id', article_controller.article_detail);

// GET request for a list of all Articles
router.get('/articles', article_controller.article_list);


//__About__\\
// GET request for the About
router.get('/about/:id/update', about_controller.about_update_get);

// POST request for the About
router.post('/about/:id/update', about_controller.about_update_post);


//__Books__\\
// GET works index page/ List of books
router.get('/books', book_controller.book_list);

// GET request for creating an Book
router.get('/book/create', book_controller.book_create_get);

// POST request for creating an Book
router.post('/book/create', book_controller.book_create_post);

// GET request to delete Book
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET request to update Book
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for single Book
router.get('/book/:id', book_controller.book_detail);



module.exports = router;
