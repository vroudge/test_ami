import { Module } from "@nestjs/common";
import { TodoResolver } from "./adapters/graphql/todo.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./infra/todo/todo.entity";
import { TodoRepository } from "./infra/todo/todo.repository";
import { FindTodosHandler } from "./domain/queries/find-todos/find-todos.handler";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { TodoMapper } from "./dtos/todo.mapper";
import { CreateTodoHandler } from "./domain/commands/create-todo/create-todo.handler";
import { TodoUpdatedEventHandler } from "./domain/events/todo-updated.handler";
import { WebhooksController } from "./adapters/http-webhooks/webhooks.controller";
import { TrelloMapper } from "./dtos/trello.mapper";
import { UpdateTodoHandler } from "./domain/commands/update-todo/update-todo.handler";

export const CommandHandlers = [CreateTodoHandler, UpdateTodoHandler];
export const QueryHandlers = [FindTodosHandler];
export const EventHandlers = [TodoUpdatedEventHandler];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TodoEntity])],
  controllers: [WebhooksController],
  providers: [
    EventBus,
    TrelloMapper,
    TodoResolver,
    TodoRepository,
    TodoMapper,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class TodoModule {}
