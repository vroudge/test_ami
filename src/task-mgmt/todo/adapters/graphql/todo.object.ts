import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TODO_STATUS } from "../../infra/todo.entity";

registerEnumType(TODO_STATUS, {
  name: "TODO_STATUS",
  description: "The possible states of a todo",
});
@ObjectType()
export class TodoGraphql {
  constructor(props: Partial<TodoGraphql>) {
    Object.assign(this, props);
  }

  @Field(() => ID, { description: "The id of the task" })
  public id: string;

  @Field(() => String, { description: "The name of the task" })
  public title: string;

  @Field(() => String, { description: "The content of the task" })
  public description: string;

  @Field(() => TODO_STATUS, { description: "The status of the task" })
  public status: TODO_STATUS;

  @Field(() => Date, { description: "The date of creation of the task" })
  public createdAt: Date;

  @Field(() => Date, { description: "The name of the media" })
  public updatedAt?: Date;
}
