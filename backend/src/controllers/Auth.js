import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
import User from '../models/User';

import bcrypt from 'bcryptjs';

import {catchError, sendResponse} from "../Service/Response";
import {verifyToken} from "../Service/VerifyToken";
import createToken from "../Service/CreateToken";

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await getUser(res, {email});

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return catchError(res, {general: "Email or password is incorrect"});
  }

  const token = createToken(user.email);

  return sendResponse(res, {token, user});
});

router.post('/me', verifyToken, async (req, res) => {
  const {email, token} = req.body;

  const user = await getUser(res, {email});

  return sendResponse(res, {token, user});
});

router.post('/register', async (req, res) => {
  const {email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const data = await getUser(res, {email});
  if (data) return catchError(res, {general: "User with such an email is already exist"});

  User.create({...req.body, password: hashedPassword}, (error, user) => {
    if (error) return catchError(res, error, 500);

    const token = createToken(user.email);

    return sendResponse(res, {token, user});
  });
});

const getUser = (res, payload) => (
  User.findOne(payload, (error, data) => error ? catchError(res, error, 500) : data)
);


export default router;
