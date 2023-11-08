import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RoadmapType {
  @Field()
  roadmap: string
}