const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 100 }
  }
);

// Virtual for Category's URL
CategorySchema
.virtual('url')
.get(function () {
  return '/catalog/category' + this._id;
});

// Export Model
module.exports = mongoose.model('Category', CategorySchema);