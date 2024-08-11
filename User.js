const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { type } = require('os');
  
// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: false },
  password:{type:String,required: true}
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
// Create the user model
const User = mongoose.model('User', userSchema);




module.exports = User;
