import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserType } from "./user.types";
import User from "../../models/User";

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<any[]> {
    return await User.find();
  }

  @Query(() => UserType, { nullable: true })
  async getUserByEmail(@Arg("email") email: string): Promise<UserType | null> {
    return await User.findOne({ email: email });
  }

  @Query(() => UserType, { nullable: true })
  async getUserById(@Arg("_id") _id: string): Promise<UserType | null> {
    return await User.findById(_id);
  }

  @Mutation(() => String)
  async deleteUserByEmail(@Arg("email") email: string): Promise<string> {
    const user: any = await User.findOne({ email: email });
    if (!user) return `User with email ${email} was not found.`;
    await User.deleteOne(user);
    return "User deleted successfully";
  }

  @Mutation(() => String)
  async deleteUserById(@Arg("_id") _id: string): Promise<string> {
    const user: any = await User.findById(_id);
    if (!user) return `User with email ${_id} was not found.`;
    await User.deleteOne(user);
    return "User deleted successfully";
  }
}