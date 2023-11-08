import { OpenAI } from "langchain/llms/openai";
import { configDotenv } from "dotenv";
import { PromptTemplate } from "langchain/prompts";

configDotenv();

const llm: OpenAI = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function generateFQ(
  problem: string,
  idea: string,
  name: string,
  prompt: PromptTemplate
): Promise<string> {
  const input: string = await prompt.format({
    problem: problem,
    idea: idea,
    name: name,
  });
  return await llm.call(input);
}

export async function checkAnswer(
  idea: string,
  question: string,
  answer: string,
  name: string,
  prompt: PromptTemplate
): Promise<string> {
  const input: string = await prompt.format({
    idea: idea,
    question: question,
    answer: answer,
    name: name,
  });

  return await llm.call(input);
}

export async function generateRoadmap(
  idea: string,
  answer: string,
  name: string,
  prompt: PromptTemplate
): Promise<string> {
  const input: string = await prompt.format({
    idea: idea,
    answer: answer,
    name: name,
  });

  return await llm.call(input);
}