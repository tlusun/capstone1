var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  email: {
        type: String,
        required: true
    },
  number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
