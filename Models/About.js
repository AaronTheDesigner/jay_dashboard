const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: String,
  profession: String,
  description: String,
  //footerPhone: Number,
  footerEmail: String,
  footerDescription: String
});

const About = mongoose.model('About', AboutSchema);

module.exports = About;