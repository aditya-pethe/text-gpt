import * as dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhone = process.env.TWILIO_PHONE
const client = require('twilio')(accountSid, authToken);

export const getChatLog = async (userPhone: string, messageLimit = 5) => {

    try {
      const responseFrom = await client.messages.list({
        from: userPhone,
        to: twilioPhone,
        limit: messageLimit
      });
  
      const responseTo = await client.messages.list({
        from: twilioPhone,
        to: userPhone,
        limit: messageLimit
      });

      const combinedResponse = [...responseFrom, ...responseTo];
      const sortedResponse = combinedResponse.sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
      const completeResponse = sortedResponse.slice(0, messageLimit).map(message => message.toJSON());
      
      let res = ""

      console.log(completeResponse.length)

      for (var i = 0; i < completeResponse.length; i++) {

        console.log(`number: ${completeResponse[i].from}`)

        if(completeResponse[i].from != twilioPhone){
            res += `Q: ${completeResponse[i].body} \n`;
        }else{
            const twilioPrefix = "Sent from your Twilio trial account - ";
            res += `A: ${completeResponse[i].body.replace(twilioPrefix,"")} \n`;

        }
    }

    return res;
      

    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      return [];
    }
  };


