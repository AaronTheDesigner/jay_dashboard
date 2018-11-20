const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const Book = require('../Models/Book');

const async = require('async');

exports.index = async (req, res, next) => {
  const books = await Book.find({}).populate();
  res.render('book_list', {
    books
      }
    )
}

// Display a list of all books
exports.book_list = async (req, res, next) => {
  const books = await Book.find({}).populate();
  res.render('book_list', {
    books
  })    
};

// Display a specific book
exports.book_detail = async (req, res) => {
  const book = await Book.findById(req.params.id).populate();
  res.render('book_detail', {
    book
  })
};

// Handle Book Create on GET
exports.book_create_get = function(req, res) {
  res.render('book_form')
};

// Handle Book Create on POST
exports.book_create_post = [
  // Validate Fields
  body('title').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('author').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('summary').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('features').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('isbn').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('preview').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('isbn').isLength({min: 1}).trim().withMessage('This field must be specified.'),

  // Sanitize Fields
  sanitizeBody('title').trim().escape(),
  sanitizeBody('description').trim().escape(),
  sanitizeBody('author').trim().escape(),
  sanitizeBody('content').trim().escape(),
  sanitizeBody('subject').trim().escape(),

  //Process request after validation and sanitation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Errors present. Re-render
      res.render('article_form', { title: 'Create Article', article: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data form is valid.
      //Create Book object esc/trim data.
      var article = new Article(
        {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          content: req.body.content,
          subject: req.body.subject
        }
      );
      article.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect
        res.redirect(article._id)
      });
    }
  }


]

// Display Book Delete form on GET
exports.book_delete_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle Book delete form on POST
exports.book_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book delete post');
};

// Display Book update form on GET
exports.book_update_get = function(req, res, next) {

  // Get article
  async.parallel({
      article: function(callback) {
          Article.findById(req.params.id).populate().exec(callback);
      }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.article==null) { // No results.
              var err = new Error('Article not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          res.render('article_update', { title: 'Article', article: results.article });
          
      });

};

// Handle Book update on POST
exports.book_update_post = [
  // Validate Fields
  body('title').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('description').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('author').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('content').isLength({min: 1}).trim().withMessage('This field must be specified.'),
  body('subject').isLength({min: 1}).trim().withMessage('This field must be specified.'),

  // Sanitize Fields
  sanitizeBody('title').trim().escape(),
  sanitizeBody('description').trim().escape(),
  sanitizeBody('author').trim().escape(),
  sanitizeBody('content').trim().escape(),
  sanitizeBody('subject').trim().escape(),

  //Process request after validation and sanitation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Errors present. Re-render
      res.render('article_form', { title: 'Create Article', article: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data form is valid.
      //Create Article object esc/trim data.
      var article = new Article(
        {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          content: req.body.content,
          subject: req.body.subject,
          _id: req.params.id
        }
      );
      Article.findByIdAndUpdate(req.params.id, article, {}, function (err, thearticle){
        if (err) { return next(err); }
         res.render('sub')
      })
    }
  }


]

