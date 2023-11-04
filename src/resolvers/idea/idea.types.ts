import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class ArgumentationType {
  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  answer: number;
}

@ObjectType()
export class IdeaType {
  @Field(() => ID)
  _id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  idea: string;

  @Field()
  feedback: string;

  @Field(() => ArgumentationType, { nullable: true })
  argumentation: ArgumentationType;
}