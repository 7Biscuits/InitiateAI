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
    const user: any = await User.findOne({ email: email });
    return user;
  }

  @Query(() => UserType, { nullable: true })
  async getUserById(@Arg("_id") _id: string): Promise<UserType | null> {
    const user: any = await User.findById(_id);
    return user;
  }

  @Mutation(() => String)
  async deleteUserByEmail(@Arg("email") email: string): Promise<string> {
    const user: any = await User.findOne({ email: email });
    if (!user) return "User not found";
    await User.deleteOne(user);
    return "User deleted successfully";
  }

  @Mutation(() => String)
  async deleteUserById(@Arg("_id") _id: string): Promise<string> {
    const user: any = await User.findById(_id);
    if (!user) return "User not found";
    await User.deleteOne(user);
    return "User deleted successfully";
  }
}
