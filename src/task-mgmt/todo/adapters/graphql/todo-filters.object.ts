import { Field, ID, InputType } from "@nestjs/graphql";
import { TODO_STATUS } from "../../infra/todo.entity";

@InputType()
export class TodoFilters {
  @Field(() => [ID], {
    nullable: true,
    description: "The ids of the tasks we're looking for",
  })
  public ids?: string[];

  @Field(() => String, {
    nullable: true,
    description: "A simple search on the name of the task",
  })
  public nameSearch?: string;

  @Field(() => [TODO_STATUS], {
    nullable: true,
    description: "The statuses of the tasks we're looking for",
  })
  public statuses?: TODO_STATUS[];
}
