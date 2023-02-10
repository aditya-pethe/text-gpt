const { Configuration, OpenAIApi } = require("openai");
import GPT3Tokenizer from "gpt3-tokenizer";
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

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
  
  
function truncatePrompt(text: string, maxTokens: number): string {
  const encoded = tokenizer.encode(text);
  const numTokens = encoded.bpe.length;
  const truncated = encoded.bpe.slice(numTokens - maxTokens);
  const decoded = tokenizer.decode(truncated);
  return decoded;
}

export const getReply = async (
    message: string,
  ): Promise<string> => {

    message = message.trim();
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.6,
      });

    return completion.data.choices[0].text;
  }

//   async function main() {
//     const res = await getReply("Give me a superhero name");
//     console.log(res);
//   }
//   main();