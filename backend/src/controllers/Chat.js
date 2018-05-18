import router from "./Auth";
import {catchError, sendResponse} from "../Service/Response";
import Chat from "../models/Chat";
import User from '../models/User';
import {verifyToken} from "../Service/VerifyToken";

router.post('/createChat', verifyToken, async (req, res) => {
  let {id} = req.body;
  id = id.trim();
  const data = await getChat(res, {id});
  if (data) return catchError(res, {name: "Global chat with such a name already exist"});

  Chat.create({...req.body}, async (error, chat) => {
    if (error) return catchError(res, error, 500);

    const user = await updateUserChats(res, req.body);

    return sendResponse(res, {chat, user});
  });
});

router.post('/addChat', verifyToken, async (req, res) => {
  const {name, publicChat} = req.body;
  const user = await updateUserChats(res, req.body);

  return sendResponse(res, {user, chat: {name, publicChat}});
});

const updateUserChats = (res, data) => {
  const {id, name, email, publicChat} = data;
  const a = {$addToSet: {chats: {id, name, publicChat}}};
  // const a = {chats: []};
  return User.findOneAndUpdate({email}, a, {new: true}, (error, user) => {
    if (error) return catchError(res, error, 500);
    return user;
  });
};


export const getChat = (res, payload, find = 'findOne') => (
  Chat[find](payload, (error, data) => error ? catchError(res, error, 500) : data)
);

export default router;
