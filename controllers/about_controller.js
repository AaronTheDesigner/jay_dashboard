const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const About = require('../Models/About');

const async = require('async');

exports.about_update_get = async (req, res) => {
  const about = await About.findById(req.params.id).populate()
  res.render('about_update', {
    about
  })
}

exports.about_update_post = [
  //  Validate Fields
  body('name').isLength({min: 1}).trim().withMessage('This field must be specified'),
  body('profession').isLength({min: 1}).trim().withMessage('This field must be specified'),
  body('description').isLength({min: 1}).trim().withMessage('This field must be specified'),
  body('footerEmail').isLength({min: 1}).trim().withMessage('This field must be specified'),
  body('footerDescription').isLength({min: 1}).trim().withMessage('This field must be specified'),

  // Sanitize Fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('profession').trim().escape(),
  sanitizeBody('description').trim().escape(),
  sanitizeBody('footerEmail').trim().escape(),
  sanitizeBody('footerDescription').trim().escape(),

  // Process request after validation and sanitation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Errors present. Re-render
      res.render('about_update', { title: 'Create Article', article: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data form is valid.
      // Create About Object esc/trim data.
      var about = new About(
        {
          name: req.body.name,
          profession: req.body.profession,
          description: req.body.description,
          footerEmail: req.body.footerEmail,
          footerDescription: req.body.footerDescription,
          _id: req.params.id
        }
      );
      About.findByIdAndUpdate(req.params.id, about, {},
        function(err, theabout){
          if (err) { return next(err); }
          res.render('sub')
        })
    }
  }
]


