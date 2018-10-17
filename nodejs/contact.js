// Model mongodb
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  name: String,
  surname: String,
  age: Number,
  birthdate: String,
  gender: String,
  phone: String,
  type: String
});
module.exports = mongoose.model('Contact', schema);
