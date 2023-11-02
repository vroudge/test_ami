import { TODO_STATUS, TodoEntity } from "../../../infra/todo/todo.entity";

export class UpdateTodoCommand {
  constructor(
    public readonly command: {
      todo: TodoEntity;
    },
  ) {}
}
