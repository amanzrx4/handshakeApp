import jwt, { SignOptions } from "jsonwebtoken";
import customConfig from "../../../utils/config/env";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const key = customConfig["accessTokenPrivateKey"];
  return jwt.sign(payload, key, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  const key = customConfig["accessTokenPrivateKey"];

  try {
    return jwt.verify(token, key) as T;
  } catch (error) {
    console.log("error verifying jwt: ", error);
    return null;
  }
};
