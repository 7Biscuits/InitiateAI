import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  ID,
} from "type-graphql";
import Item from "../../models/itemModel";
import IItem from "../../interfaces/IItem";

@ObjectType()
class ItemType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@Resolver()
class ItemResolver {
  @Query(() => [ItemType])
  async getAllItems(): Promise<IItem[]> {
    return await Item.find();
  }

  @Query(() => ItemType, { nullable: true })
  async getItem(@Arg("_id") _id: string) {
    return await Item.findById(_id);
  }

  @Mutation(() => ItemType)
  async createItem(
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<IItem> {
    const item: IItem = new Item({ name, description });
    return await item.save();
  }

  @Mutation(() => ItemType, { nullable: true })
  async updateItem(
    @Arg("_id") _id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<any> {
    return await Item.findByIdAndUpdate(
      _id,
      { name, description },
      { new: true }
    );
  }

  @Mutation(() => ItemType, { nullable: true })
  async deleteItem(@Arg("_id") _id: string): Promise<any> {
    await Item.findByIdAndRemove(_id);
  }

  @Mutation(() => String)
  async deleteAllItems(): Promise<string> {
    try {
      await Item.deleteMany({});
      return "All the items have been delete"
    } catch (error) {
      throw new Error('Failed to delete all items.');
    }
  }
}

export default ItemResolver;