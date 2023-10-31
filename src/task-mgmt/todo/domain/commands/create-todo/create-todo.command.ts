import { PaginationArgs } from "../../../lib/pagination-args.object";
import { TODO_STATUS } from "../../../infra/todo/todo.entity";

export class CreateTodoCommand {
  constructor(
    public readonly command: {
      title: string;
      description: string;
      status: TODO_STATUS;
    },
  ) {}
}
