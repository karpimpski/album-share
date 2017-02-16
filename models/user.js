var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: String,
  city: String,
  state: String,
  albums: {type: Array, default: []},
  trades: {type: Array, default: []}
});

userSchema.methods.validPassword = function(pwd) {
	return (this.password === pwd);
};

var User = mongoose.model('User', userSchema);

module.exports = User;