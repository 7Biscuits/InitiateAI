import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { QuestionType } from "./question.types";
import { questionPrompt } from "../../helpers/ai/prompts/question";
import { checkAnswerPrompt } from "../../helpers/ai/prompts/answer";
import Idea from "../../models/Idea";
import User from "../../models/User";
import { generateFQ, checkAnswer } from "../../helpers/ai/llm";

@Resolver()
export class QuestionResolver {
  @Query(() => QuestionType)
  async getQuestion(@Arg("idea_id") _id: string): Promise<QuestionType> {
    const idea: any = await Idea.findById(_id);
    const user: any = await User.findOne({ email: idea.email });
    const question: string = await generateFQ(
      idea.problem,
      idea.idea,
      user.name,
      questionPrompt
    );
    idea.argumentation.question = question;
    await idea.save();
    return {
      question: question,
      idea: idea.idea,
      name: user.name,
    };
  }

  @Mutation(() => QuestionType)
  async answerQuestion(
    @Arg("idea_id") _id: string,
    @Arg("answer") answer: string
  ): Promise<QuestionType> {
    const idea: any = await Idea.findById(_id);
    const user: any = await User.findOne({ email: idea.email });
    const question: string = idea.argumentation.question;
    console.log(question);
    const rating: string = await checkAnswer(
      idea.idea,
      question,
      answer,
      user.name,
      checkAnswerPrompt
    );
    // idea.argumentation.answer = answer;
    // idea.argumentation.rating = rating;
    // idea.save();
    await Idea.findOneAndUpdate(idea, {
      argumentation: { answer: answer, rating: rating },
    });
    return {
      idea: idea.idea,
      question: question,
      name: user.name,
      rating: rating,
      answer: answer,
    };
  }
}