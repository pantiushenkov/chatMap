import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  email: String,
  image: String,
  password: String,
  chats: [{id: String, name: String, publicChat: Boolean}]
});

export default mongoose.model('User', User);
