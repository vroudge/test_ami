import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: "The name of the task" })
  public title: string;
  @Field(() => String, { description: "The content of the task" })
  public description: string;
}
