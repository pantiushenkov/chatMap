import router from "./Auth";
import {catchError, sendResponse} from "../Service/Response";
import Chat from "../models/Chat";
import User from '../models/User';
import {verifyToken} from "../Service/VerifyToken";

router.post('/addChat', verifyToken, async (req, res) => {
  const {id, name, email} = req.body;

  const data = await getChat(res, {id});
  if (data) return catchError(res, {name: "Global chat with such a name already exist"});

  Chat.create({...req.body}, (error, chat) => {
    if (error) return catchError(res, error, 500);

    User.findOneAndUpdate({email}, {$push: {chats: {id, name}}}, {new: true}, (error, user) => {
      if (error) return catchError(res, error, 500);
      return sendResponse(res, {chat, user});
    });
  });

});

export const getChat = (res, payload, find = 'findOne') => (
  Chat[find](payload, (error, data) => error ? catchError(res, error, 500) : data)
);

export default router;
