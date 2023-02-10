import express from 'express';
import * as dotenv from 'dotenv';
import { getReply } from "./services/openai";

const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

dotenv.config();

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhone = process.env.TWILIO_PHONE
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('200 OK!');
});

app.post("/sms/reply", async (req, res) => {

    const userMessage = req.body.Body;
    const userPhone = req.body.From;
    const message = await getReply(userMessage)
  
    client.messages
      .create({
        from:twilioPhone,
        to:userPhone,
        body: message
      })
      .then(message => console.log(message.sid))
    
  });

app.listen(port, () => {
  return console.log(`Server listening on port: ${port}`);
});