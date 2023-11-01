import { OpenAI } from "langchain/llms/openai";
import { configDotenv } from "dotenv";
import { PromptTemplate } from "langchain/prompts";

configDotenv();

const llm: OpenAI = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function execute(idea: string, name: string, prompt: PromptTemplate): Promise<string> {
  const input: string = await prompt.format({
    idea: idea,
    name: name,
  });
  const resp: string = await llm.call(input);
  return resp;
}