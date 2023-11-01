export interface IIdea {
  email: string;
  name: string;
  idea: string;
  feedback: string;
  argumentation: {
    question: string;
    answer: string;
  };
}
