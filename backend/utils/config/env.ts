import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, ".env.production")
      : path.resolve(__dirname, ".env.development"),
});

const customConfig = {
  //   port: 8000,
  //   accessTokenExpiresIn: 15,
  //   refreshTokenExpiresIn: 60,
  //   redisCacheExpiresIn: 60,
  //   origin: "http://localhost:3000",

  //   dbUri: process.env.DATABASE_URL as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
  accountSid: process.env.TWILIO_ACCOUNT_SID as string,
  authToken: process.env.TWILIO_AUTH_TOKEN as string,
  serviceSid: process.env.TWILIO_SERVICE_SID as string,
  apiKey: process.env.TWILIO_API_KEY as string,
  apiSecret: process.env.TWILIO_API_SECRET as string,
};

export default customConfig;
