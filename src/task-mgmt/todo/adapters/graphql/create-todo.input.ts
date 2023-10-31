import { Field, InputType } from "@nestjs/graphql";
import { TODO_STATUS } from "../../infra/todo/todo.entity";

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: "The name of the task" })
  public title: string;

  @Field(() => TODO_STATUS, { description: "The status of the task" })
  public status: TODO_STATUS;

  @Field(() => String, { description: "The content of the task" })
  public description: string;
}
