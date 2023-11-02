import { InjectRepository } from "@nestjs/typeorm";
import { TODO_STATUS, TodoEntity } from "./todo.entity";
import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { PaginationArgs } from "../../lib/pagination-args.object";

@Injectable()
/**
 * Service for interacting with Todo
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
    filters: { ids?: string[]; statuses?: TODO_STATUS[]; vendorIds?: string[] },
    { limit: take, offset: skip }: PaginationArgs = { limit: 10, offset: 0 },
  ): Promise<TodoEntity[]> {
    const query: any = {};

    if (filters?.ids?.length) {
      query.id = In(filters.ids);
    }
    if (filters?.statuses?.length) {
      query.id = In(filters.statuses);
    }
    if (filters?.vendorIds?.length) {
      query.vendorId = In(filters.vendorIds);
    }

    return this.todoRepo.find({ where: query, take, skip });
  }

  public createTodo(
    title: string,
    description?: string,
    status?: TODO_STATUS,
    vendorId?: string,
    completedAt?: Date,
  ): Promise<TodoEntity> {
    const todo = this.todoRepo.create({ title, description, status, vendorId });
    return this.todoRepo.save(todo);
  }

  async updateTodo(
    id: string,
    title: string,
    description?: string,
    status?: TODO_STATUS,
    completedAt?: Date,
  ) {
    const todo = await this.findTodoById(id);
    todo.title = title;
    todo.description = description;
    todo.status = status ? status : todo.status;
    if (completedAt) {
      todo.completedAt = completedAt;
    }

    return this.todoRepo.save(todo);
  }
}
