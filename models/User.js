var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var user = new Schema({
  username: String,
  password: String,
});

// hash the password
user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
var User = mongoose.model('user', user);
module.exports = User;