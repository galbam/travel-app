const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {
          type: String,
     },

     password: {
          type: String,
     },
     googleId:String,
     userId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;