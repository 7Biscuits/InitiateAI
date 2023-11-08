import { Resolver, Query, Arg } from "type-graphql";
import { RoadmapType } from "./roadmap.type";
import { roadmapPrompt } from "../../helpers/ai/prompts/roadmap";
import Idea from "../../models/Idea";
import User from "../..//models/User";
import { generateRoadmap } from "../../helpers/ai/llm";

@Resolver()
export class RoadmapResolver {
  @Query(() => RoadmapType)
  async getRoadmap(@Arg("idea_id") _id: string): Promise<RoadmapType> {
    const idea: any = await Idea.findById(_id);
    const user: any = await User.findOne({ email: idea.email });
    const roadmap: string = await generateRoadmap(
      idea.idea,
      idea.argumentation.answer,
      user.name,
      roadmapPrompt
    );
    await Idea.findOneAndUpdate(idea, { roadmap: roadmap });
    return { roadmap: roadmap };
  }
}
