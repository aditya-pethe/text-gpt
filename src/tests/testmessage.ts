import * as dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio_phone = process.env.TWILIO_PHONE
const user_phone = process.env.MY_PHONE
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
       body: "Hello from Twilio", 
       from: "+18332084218", 
       to: "+18328140815" })
  .then(message => console.log(message.sid));


