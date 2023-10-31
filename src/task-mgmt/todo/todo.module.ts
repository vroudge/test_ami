import { Module } from "@nestjs/common";
import { TodoResolver } from "./adapters/graphql/todo.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./infra/todo/todo.entity";
import { TodoRepository } from "./infra/todo/todo.repository";
import { FindTodosHandler } from "./domain/queries/find-todos/find-todos.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TodoMapper } from "./dtos/todo.mapper";
import { CreateTodoCommand } from "./domain/commands/create-todo/create-todo.command";
import { CreateTodoHandler } from "./domain/commands/create-todo/create-todo.handler";
export const CommandHandlers = [CreateTodoHandler];
export const QueryHandlers = [FindTodosHandler];
export const EventHandlers = [];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    TodoResolver,
    TodoRepository,
    TodoMapper,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class TodoModule {}
