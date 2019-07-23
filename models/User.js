const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {
          type: String,
          required: true
     },
     password: {
          type: String,
          minlength: 8,
          maxlength: 24,
          required: true
     }
},
{
     timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;