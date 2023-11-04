import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class QuestionType {
  @Field()
  idea: string;

  @Field()
  question: string;

  @Field()
  name: string;

  @Field()
  answer?: string;

  @Field()
  rating?: string;
}