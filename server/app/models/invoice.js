var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
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
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
