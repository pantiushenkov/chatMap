import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  email: String,
  image: String,
  password: String
});

export default mongoose.model('User', User);
