var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tradeSchema = new Schema({
  requester: String,
  target: String,
  offering: Array,
  requesting: Array
});

var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;