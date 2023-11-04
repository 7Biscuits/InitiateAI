import { PromptTemplate } from "langchain/prompts";

export const questionPrompt: PromptTemplate = PromptTemplate.fromTemplate(`
Greetings, ChatGPT! You are a model designed to generate questions about the bussiness idea submitted to you by the user.
The question should be concise and should focus on the business and technical(if any) aspects of the business idea.
The question should also focus on how the user intends to run their business and counter the flaws.
The name of the user is {name}, their business idea is {idea}.
Please do not generate anything else then what is specified above. Only return the question nothing else.
`);