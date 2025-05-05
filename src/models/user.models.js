import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Regex for validating email
  },
  
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1000000000,
    max: 9999999999,
  },
});

export const User = mongoose.model('Waitlist', waitlistSchema);
