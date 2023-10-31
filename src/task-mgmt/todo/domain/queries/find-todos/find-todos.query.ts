import { PaginationArgs } from "../../../lib/pagination-args.object";
import { TODO_STATUS } from "../../../infra/todo.entity";
import { IQuery } from "@nestjs/cqrs";

export class FindTodosQuery implements IQuery {
  constructor(
    public readonly filters: { ids?: string[]; statuses?: TODO_STATUS[] },
    public readonly pagination?: PaginationArgs,
  ) {}
}
