var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CompanySchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
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
  services: {
    service: {type: String, required: true},
    details: {type: String, required: true},
    price: {type: String, required: true}
  },
  descriptions: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  reviews: [{
    type: Schema.Types.ObjectId, ref: 'Review',
    required: false
  }],
  orders: [{
    type: Schema.Types.ObjectId, ref: 'Order',
    required: false
  }],
  location:{
    longitude: {type: Number, required: false},
    latitude: {type: Number, required: false}
  }


});

module.exports = mongoose.model('Company', CompanySchema);
