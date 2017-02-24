var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CompanySchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Company', CompanySchema);
