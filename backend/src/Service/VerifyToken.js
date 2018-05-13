import jwt from 'jsonwebtoken';
import config from '../config';
import {catchError} from "./Response";

export const verifyToken = (req, res, next) => {


  const token = req.headers['authorization'];
  if (!token)
    return catchError(res, {message: 'No token was provided.'}, 500);
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return catchError(res, {auth: false, message: 'Failed to authenticate token.'}, 500);
    // if everything good, save to request for use in other routes
    req.body.email = decoded.id;
    next();
  });
}
