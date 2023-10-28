import { OpenAI } from "langchain/llms/openai";
import { prompt } from "./prompts/prompt";
import { configDotenv } from "dotenv";

configDotenv();

const llm: OpenAI = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function execute(message: string, name: string): Promise<string> {
  const msg = await prompt.format({
    message: message,
    name: name,
  });
  const resp: string = await llm.call(msg);
  return resp;
}