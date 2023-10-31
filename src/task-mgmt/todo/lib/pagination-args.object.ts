import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
/**
 * Util class for passing pagination arguments
 */
export class PaginationArgs {
  @Field(() => Number, { description: "The limit of the query" })
  public limit: number = 10;

  @Field(() => Number, { description: "The offset of the query" })
  public offset: number = 0;
}
