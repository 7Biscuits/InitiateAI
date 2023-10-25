import { Resolver, Query, Arg, ObjectType, Field } from "type-graphql";
import { execute } from "../../ai/llm";

@ObjectType()
class Message {
  @Field()
  name: string;

  @Field()
  message: string;

  @Field()
  reply: string;
}

@Resolver()
class MessageResolver {
  @Query(() => Message)
  async displayMessage(
    @Arg("name") name: string,
    @Arg("message") message: string
  ): Promise<any> {
    const reply: string = await execute(message, name);
    return {
      name: name,
      message: message,
      reply: reply,
    };
  }
}

export default MessageResolver;