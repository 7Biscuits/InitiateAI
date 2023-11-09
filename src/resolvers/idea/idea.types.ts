import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class ArgumentationType {
  @Field({ nullable: true })
  question?: string;

  @Field({ nullable: true })
  answer?: string;

  @Field({ nullable: true })
  rating?: string;
}

@ObjectType()
export class IdeaType {
  @Field(() => ID)
  _id: string;

  @Field()
  problem: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  idea: string;

  @Field()
  feedback: string;

  @Field(() => ArgumentationType, { nullable: true })
  argumentation: ArgumentationType;

  @Field({ nullable: true })
  roadmap?: string;
}