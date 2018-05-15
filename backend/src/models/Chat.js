import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Chat = new Schema({
  id: String,
  name: String,
  image: String,
});

export default mongoose.model('Chat', Chat);
