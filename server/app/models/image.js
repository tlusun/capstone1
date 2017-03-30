var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Item = new ItemSchema(
 path: {
 type: String,
 required: true,
 trim: true
 },
 originalname: {
 type: String,
 required: true
 }
 
);



module.exports = mongoose.model('Item', ItemSchema);
