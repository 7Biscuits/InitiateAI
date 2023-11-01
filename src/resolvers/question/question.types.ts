import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class QuestionType {
  @Field()
  email: string;

  @Field()
  idea: string;

  @Field()
  question: string;

  @Field()
  answer: string;
}