import { OpenAI } from "langchain/llms/openai";
import { feedbackPrompt } from "./prompts/feedback";
import { configDotenv } from "dotenv";

configDotenv();

const llm: OpenAI = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function execute(idea: string, name: string): Promise<string> {
  const userIdea: string = await feedbackPrompt.format({
    idea: idea,
    name: name,
  });
  const feedback: string = await llm.call(userIdea);
  return feedback;
}