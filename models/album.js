var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: String,
  image: String,
  user: String,
  artist: String
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;