/**
 * Created by Tommy on 2/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  businessEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  invoice: {
    //type: Schema.Types.ObjectId, ref: 'Invoice',
    type: String

  },
  userAddress:{
    type: String
  },
  messages:[{
    author: String,
    date: String,
    message: String
  }],
  account_id_stripe: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
