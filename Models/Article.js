const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  subject: String
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;