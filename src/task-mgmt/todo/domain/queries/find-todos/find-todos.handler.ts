import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTodosQuery } from "./find-todos.query";
import { TodoRepository } from "../../../infra/todo.repository";
import { TodoEntity } from "../../../infra/todo.entity";

@QueryHandler(FindTodosQuery)
export class FindTodosHandler implements IQueryHandler<FindTodosQuery> {
  constructor(protected repository: TodoRepository) {}

  async execute(query: FindTodosQuery): Promise<TodoEntity[]> {
    return this.repository.findTodos(query.filters, query.pagination);
  }
}
