import { InjectRepository } from "@nestjs/typeorm";
import { TODO_STATUS, TodoEntity } from "./todo.entity";
import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { ObjectType } from "@nestjs/graphql";
import { PaginationArgs } from "../../lib/pagination-args.object";

@Injectable()
/**
 * Service for interacting with programs
 */
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    protected readonly todoRepo: Repository<TodoEntity>,
  ) {}

  public findTodoById(id: string): Promise<TodoEntity> {
    return this.todoRepo.findOneOrFail({ where: { id } });
  }

  public findTodos(
    filters: { ids?: string[]; statuses?: TODO_STATUS[] },
    { limit: take, offset: skip }: PaginationArgs = { limit: 10, offset: 0 },
  ): Promise<TodoEntity[]> {
    const query: any = {};

    if (filters?.ids) {
      query.id = In(filters.ids);
    }
    if (filters?.statuses) {
      query.id = In(filters.statuses);
    }

    return this.todoRepo.find({ where: query, take, skip });
  }

  public createTodo(
    title: string,
    description?: string,
    status?: TODO_STATUS,
  ): Promise<TodoEntity> {
    const todo = this.todoRepo.create({ title, description, status });
    return this.todoRepo.save(todo);
  }
}
