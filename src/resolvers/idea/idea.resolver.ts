import { Resolver, Query, Arg } from "type-graphql";
import { IdeaType } from "./idea.types";

@Resolver()
export class IdeaResolver {
  @Query(() => IdeaType)
  async displayMessage(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("idea") idea: string
  ): Promise<IdeaType> {
    return {
      email: email,
      name: name,
      idea: idea,
    };
  }
}