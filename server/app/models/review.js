var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  company: {
      type: String,
      required: true
    },
    customer: {
      type: String,
      required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewTitle: {
      type: String,
      required: true
    },
    date:{
      type: Date,
      required: true
    },
    rating:{
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
