import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
  title: String,
  description: String,
})

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
  description: String,
  tabs: [tabSchema],
}, {
  timestamps: true // createdAt, updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;