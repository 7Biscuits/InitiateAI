import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;
  
  @Field()
  email: string;

  @Field()
  googleId: string;

  @Field()
  name: string;
}
