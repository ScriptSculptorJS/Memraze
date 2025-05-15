import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cityState: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  pronouns: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  orientation: {
    type: String,
    required: true
  },
  lookingFor: {
    type: String,
    required: true
  }
}, {
  timestamps: true // createdAt, updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;