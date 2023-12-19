const mongoose = require('mongoose');

let User;

try {
  // Check if the model has already been defined
  User = mongoose.model('User');
} catch (e) {
  // If not, define the model
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  });

  User = mongoose.model('User', UserSchema);
}

module.exports = User;
