/**
 * Created by Tommy on 2/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  customer: {
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
  businessName: {
    type: String,
    required: true
  },
  invoice: {
    type: Schema.Types.ObjectId, ref: 'Invoice'
  }
});

module.exports = mongoose.model('Order', OrderSchema);
