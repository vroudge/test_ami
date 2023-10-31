import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TodoGraphql } from "./todo.object";
import { PaginationArgs } from "../../lib/pagination-args.object";
import { TodoFilters } from "./todo-filters.object";
import { TodoRepository } from "../../infra/todo/todo.repository";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindTodosQuery } from "../../domain/queries/find-todos/find-todos.query";
import { TodoMapper } from "../../dtos/todo.mapper";
import { CreateTodoCommand } from "../../domain/commands/create-todo/create-todo.command";
import { CreateTodoInput } from "./create-todo.input";

@Resolver((of: void) => TodoGraphql)
export class TodoResolver {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
    protected readonly mapper: TodoMapper,
  ) {}

  @Query(() => [TodoGraphql], { nullable: true })
  async todos(
    @Args("filters", { nullable: true }) filters: TodoFilters = {},
    @Args("pagination", { nullable: true })
    pagination?: PaginationArgs,
  ): Promise<TodoGraphql[]> {
    return (
      await this.queryBus.execute(new FindTodosQuery(filters, pagination))
    ).map(this.mapper.toGraphql);
  }

  @Mutation(() => TodoGraphql)
  async createTodo(
    @Args("input") input: CreateTodoInput,
  ): Promise<TodoGraphql> {
    const command = await this.commandBus.execute(new CreateTodoCommand(input));

    return this.mapper.toGraphql(command);
  }
  //
  // @Mutation(() => TodoGraphql)
  // async changeTodoStatus(): Promise<TodoGraphql> {
  //   return (
  //       await this.commandBus.execute(new )
  //   )
  // }
}
