import twilio from "twilio";

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

// console.log("env", Object.keys(process.env));

export const twilioClient = twilio(twilioAccountSid, twilioAuthToken);
