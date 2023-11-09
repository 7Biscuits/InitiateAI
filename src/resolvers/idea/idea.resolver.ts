import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { IdeaType } from "./idea.types";
import { generateFQ } from "../../helpers/ai/llm";
import { feedbackPrompt } from "../../helpers/ai/prompts/feedback";
import Idea from "../../models/Idea";
import User from "../../models/User";

@Resolver()
export class IdeaResolver {
  @Query(() => [IdeaType])
  async getAllIdeas(@Arg("email") email: string): Promise<IdeaType[]> {
    return await Idea.find({ email: email });
  }

  @Query(() => IdeaType, { nullable: true })
  async getIdea(@Arg("_id") _id: string): Promise<IdeaType | null> {
    return await Idea.findById(_id);
  }

  @Mutation(() => IdeaType)
  async createIdea(
    @Arg("email") email: string,
    @Arg("problem") problem: string,
    @Arg("idea") idea: string
  ): Promise<IdeaType> {
    const user: any = await User.findOne({ email: email });
    const feedback: string = await generateFQ(
      problem,
      idea,
      user.name,
      feedbackPrompt
    );
    const IdeaObject: any = new Idea({
      email: email,
      name: user.name,
      problem: problem,
      idea: idea,
      feedback: feedback,
    });

    return await IdeaObject.save();
  }

  @Mutation(() => IdeaType)
  async createIdeaManually(
    @Arg("email") email: string,
    @Arg("problem") problem: string,
    @Arg("idea") idea: string,
    @Arg("feedback") feedback: string,
    @Arg("question") question: string,
    @Arg("answer") answer: string,
    @Arg("rating") rating: string,
    @Arg("roadmap") roadmap: string
  ): Promise<IdeaType> {
    const user: any = await User.findOne({ email: email });
    const IdeaObject: any = new Idea({
      email: email,
      name: user.name,
      problem: problem,
      idea: idea,
      feedback: feedback,
      argumentation: {
        question: question,
        answer: answer,
        rating: rating,
      },
      roadmap: roadmap,
    });

    return await IdeaObject.save();
  }

  @Mutation(() => IdeaType)
  async editIdeaManually(
    @Arg("_id") _id: string,
    @Arg("question") question: string,
    @Arg("answer") answer: string,
    @Arg("rating") rating: string
  ): Promise<any> {
    await Idea.findByIdAndUpdate(
      _id,
      {
        $set: {
          "argumentation.answer": answer,
          "argumentation.rating": rating,
          "argumentation.question": question,
        },
      },
      { new: true }
    );
    return await Idea.findById(_id);
  }

  @Mutation(() => String)
  async deleteIdea(@Arg("_id") _id: string): Promise<String> {
    const idea: any = await Idea.findById(_id);
    if (!idea) return `Idea with id ${_id} was not found.`;
    Idea.deleteOne(idea);
    return "Idea deleted successfully.";
  }

  @Mutation(() => String)
  async deleteIdeas(@Arg("email") email: string): Promise<String> {
    const ideas: any = await Idea.find({ email: email });
    if (!ideas) return "No ideas to delete.";
    await Idea.deleteMany({ email: email });
    return "All ideas deleted.";
  }
}