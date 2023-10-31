import {
  CommandHandler,
  ICommandHandler,
  IQueryHandler,
  QueryHandler,
} from "@nestjs/cqrs";
import { FindTodosQuery } from "../../queries/find-todos/find-todos.query";
import { TodoRepository } from "../../../infra/todo.repository";
import { TodoEntity } from "../../../infra/todo.entity";
import { CreateTodoCommand } from "./create-todo.command";

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(protected repository: TodoRepository) {}

  async execute({ command }: CreateTodoCommand): Promise<TodoEntity> {
    return this.repository.createTodo(command?.title, command?.description);
  }
}
