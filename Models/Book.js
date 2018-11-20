const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    //featured: { type: Boolean, required: true  },
    isbn: { type: String, required: true },
    preview: { type: String, required: true },
    //category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/dash/book' + this._id;
});

// Export model
module.exports = mongoose.model('Book', BookSchema);