const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    preview: { type: String, required: true },
    //category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  }
);

// Virtual for book's URL
FeatureSchema
.virtual('url')
.get(function () {
  return '/dash/feature' + this._id;
});

// Export model
module.exports = mongoose.model('Feature', FeatureSchema);