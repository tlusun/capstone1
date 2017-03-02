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
    type: Date,
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
    type: Schema.Types.ObjectId, ref: 'Invoice',
    required: false
  }
});

module.exports = mongoose.model('Order', OrderSchema);
