const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },

  // Сброс пароля
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  passwordResetAttempts: { 
    type: Number, 
    default: 0 
  },
  lastPasswordResetAttempt: Date,

  // Роли и разрешения
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  permissions: {
    type: [String],
    default: []
  }

}, { timestamps: true });


// Метод: можно ли запрашивать сброс пароля
userSchema.methods.canRequestReset = function () {
  if (this.passwordResetAttempts < 5) return true;
  const hoursPassed = (Date.now() - this.lastPasswordResetAttempt) / (1000 * 60 * 60);
  return hoursPassed > 24;
};

// Метод: есть ли разрешение
userSchema.methods.hasPermission = function (permission) {
  return this.role === 'admin' || this.permissions.includes(permission);
};

module.exports = mongoose.model('User', userSchema);
