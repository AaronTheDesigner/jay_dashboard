const mongoose = require('mongoose');

const About = require('./Models/About')
const Article = require('./Models/Article')
const Feature = require('./Models/Feature')
const Category = require('./Models/Category')
const Event = require('./Models/Event')
const Book = require('./Models/Book')

mongoose.connect('mongodb://Aaron:gokuh123@ds157223.mlab.com:57223/books-march', { useNewUrlParser: true })

// About.create({
//   name: 'Jay Requard',
//   profession: 'Author, Podcaster',
//   description: 'I am the greatest author you have never heard of. Find out more about me. My website features so blog posts with my musings, my catalog of works, and my podcast',
//   footerEmail: 'jay@requard.com',
//   footerDescription: 'Buy my shiznit'
// }, (error, about) => {
//   console.log(error, about)
// })

// Category.create({
//   name: 'Shorts/Collections'
// }, (error, category) => {
//   console.log(error, category);
// });

// Event.create({
//   event: 'Event 3',
//   location: 'Anytown, USA',
//   date: 'December, 10th, 2018',
//   summary: 'Fusce nec augue mi. Integer in condimentum quam. Maecenas magna sem, dapibus sit amet nisi sit amet, convallis condimentum erat. Aenean egestas eleifend mauris vitae sollicitudin. Sed urna velit, placerat sit amet dui in, faucibus luctus tellus. Fusce lectus neque, bibendum at risus ac, bibendum posuere nisl. Integer luctus porta risus, nec consequat nunc ullamcorper cursus. Fusce in ultricies mi, vitae congue augue. Proin feugiat porta sem, non fringilla arcu. Vestibulum et sagittis leo.'
// }, (error, event) => {
//   console.log(error, event);
// })

Book.create({
  title: 'Book 3',
  author: 'Jay Requard',
  summary: 'Fusce nec augue mi. Integer in condimentum quam. Maecenas magna sem, dapibus sit amet nisi sit amet, convallis condimentum erat. Aenean egestas eleifend mauris vitae sollicitudin. Sed urna velit, placerat sit amet dui in, faucibus luctus tellus. Fusce lectus neque, bibendum at risus ac, bibendum posuere nisl. Integer luctus porta risus, nec consequat nunc ullamcorper cursus. Fusce in ultricies mi, vitae congue augue. Proin feugiat porta sem, non fringilla arcu. Vestibulum et sagittis leo.',
  isbn: '9382jf927',
  preview: 'Fusce nec augue mi. Integer in condimentum quam. Maecenas magna sem, dapibus sit amet nisi sit amet, convallis condimentum erat. Aenean egestas eleifend mauris vitae sollicitudin. Sed urna velit, placerat sit amet dui in, faucibus luctus tellus. Fusce lectus neque, bibendum at risus ac, bibendum posuere nisl. Integer luctus porta risus, nec consequat nunc ullamcorper cursus. Fusce in ultricies mi, vitae congue augue. Proin feugiat porta sem, non fringilla arcu. Vestibulum et sagittis leo.',
  

}, (error, book) => {
  console.log(error, book);
})