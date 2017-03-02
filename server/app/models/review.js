var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  companyEmail: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    review: {
        type: String,
        required: true
    },
    rating:{
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
