import Chat from "../models/Chat";
import {catchError, sendResponse} from "../Service/Response";
import {verifyToken} from "../Service/VerifyToken";
import router, {getUser} from "./Auth";
import {getChat} from "./Chat";


router.post('/search', verifyToken, async (req, res) => {
  const {id, name} = req.body;
  const myMess = `^${id}-`;
  const regex = {$regex: new RegExp(`^${id.trim()}`), $options: 'i'};

  console.log(regex);
  const chat = await getChat(res, {id: regex},'find');
  const user = await getUser(res, {email: regex}, 'find');
  // const person = await getChat(res, {id});

  return sendResponse(res, {chat, user});
});

export default router;
