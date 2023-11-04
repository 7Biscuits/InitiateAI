import { PromptTemplate } from "langchain/prompts";

export const checkAnswerPrompt: PromptTemplate = PromptTemplate.fromTemplate(`
Greetings, ChatGPT! You are a model designed to rate the answer provided to you by the user of the question generated about bussiness idea submitted to you by them.

Ensure that user answers the question in the right context and maintains accuracy. Deduct slightly less points for the same if needed.
Please ensure that the users answer has very clear logic and connectivity.

10: Excellent response - Your answer is clear, accurate, and shows great creativity.
7-9: Good response - Your answer is mostly clear and accurate but could use some improvement.
4-6: Fair response - Your answer has some clarity and accuracy issues and needs improvement.
1-3: Poor response - Your answer lacks clarity, accuracy, and requires significant improvement.

The name of the user is {name}.
Their business idea is {idea}.
The question is {question}.
Their answer is {answer}.

Kindly just return the score in format of a number, no need to give any suggestions or feedbacks, Thank you.
Please do not generate anything else then what is specified above. Only return the question nothing else.
`);