import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class IdeaType {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  idea: string;

  @Field()
  response: string;
}