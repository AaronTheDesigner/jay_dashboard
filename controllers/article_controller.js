const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const Article = require('../Models/Article');
const About = require('../Models/About');

const async = require('async');

exports.index = async (req, res, next) => {
  const abouts = await About.find({}).populate();
  const count = await Article.countDocuments({});
  res.render('dash', {abouts, count})
}

// Display a list of all Articles
exports.article_list = async (req, res, next) => {
  const articles = await Article.find({}).populate().sort({ createdAt: -1});
  res.render('article_list', {
    articles
  })    
};

// Display a specific article
exports.article_detail = async (req, res) => {
  const article = await Article.findById(req.params.id).populate();
  res.render('article_detail', {
    article
  })
};

// Handle Article Create on GET
exports.article_create_get = function(req, res) {
  res.render('article_form')
};

// Handle Article Create on POST
exports.article_create_post = [
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

// Display Article Delete form on GET
exports.article_delete_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: Article delete GET');
};

// Handle Article delete form on POST
exports.article_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Article delete POST');
};

// Display Article update form on GET
exports.article_update_get = function(req, res, next) {

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

// Handle Article update on POST
exports.article_update_post = [
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

