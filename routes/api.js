const express = require('express');
const router = express.Router();
const Article = require('../Models/Article');

//Get all articles
router.get('/articles', function(req, res, next){
  Article.find({}).then(function(articles){
    res.send(articles)
  }).then(function(articles){
    res.send(articles);
  }).catch(next);
});
// Get one article
router.get('/articles/:id', function(req, res, next){
  Article.findById({_id: req.params.id}, req.body).then(function(){
    Article.findOne({_id: req.params.id}).then(function(article){
      res.send(article);
    });
  }).catch(next);
});
// Delete one article
router.delete('/articles/:id', function(req, res, next){
  Article.findByIdAndRemove({_id: req.params.id}).then(function(article){
    res.send(article);
  }).catch(next);
});
// Edit one article
router.put('/articles/:id', function(req, res, next){
  Article.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Article.findOne({_id: req.params.id}).then(function(article){
      res.send(article);
    });
  }).catch(next);
});


//__View Routes__\\



module.exports = router;