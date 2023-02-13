const { Configuration, OpenAIApi } = require("openai");
import GPT3Tokenizer from "gpt3-tokenizer";
import { getChatLog } from "./chatlog";

import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();



const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
const MAX_TOKENS = 500;

function countBPETokens(text: string): number {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type OpenAIResponse = {
    text: string;
  };
  

const createPrompt = async (message: string, phone: string): Promise<string> => {

  const chatHistory = await getChatLog(phone);

  const chatprompt = `You are a conversational chatbot, 
  communicating over sms. As such, each of your answers can
  be no longer than 1000 characters.
  
  ${chatHistory}
  Q:${message}
  A: 
  `
  return chatprompt;
}

export const getReply = async (
    message: string,
    phone: string,
  ): Promise<string> => {

    message = message.trim();
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: createPrompt(message, phone),
        max_tokens: MAX_TOKENS,
        temperature: 0.6,
      });

    return completion.data.choices[0].text;
  }

//   async function main() {
//     const res = await getReply("Give me a superhero name");
//     console.log(res);
//   }
//   main();