import jwt from "jsonwebtoken";
import config from "../config";

export default (id) => {
  return jwt.sign({id}, config.secret, {
    expiresIn: config.expiresIn
  });
};
