import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { IdeaType } from "./idea.types";
import { execute } from "../../helpers/ai/llm";
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
    @Arg("idea") idea: string
  ): Promise<IdeaType> {
    const name: any = await User.findOne({ email: email });
    const feedback: string = await execute(idea, name, feedbackPrompt);
    const IdeaObject: any = new Idea({
      email: email,
      name: name,
      idea: idea,
      response: feedback,
    });
    IdeaObject.save();
    return IdeaObject;
  }

  @Mutation(() => String)
  async deleteIdea(@Arg("_id") _id: string): Promise<String> {
    const idea: any = Idea.findById(_id);
    if (!idea) return `Idea with id ${_id} was not found.`;
    Idea.deleteOne(idea);
    return "Idea deleted successfully";
  }

  @Mutation(() => String)
  async deleteIdeas(@Arg("email") email: string): Promise<String> {
    const ideas: any = Idea.find({ email: email });
    if (!ideas) return "No ideas to delete.";
    Idea.deleteMany(ideas);
    return "All ideas deleted.";
  }
}