import { TodoGraphql } from "../adapters/graphql/todo.object";
import { TodoEntity } from "../infra/todo/todo.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoMapper {
  public toModel(todo: TodoGraphql): TodoEntity {
    return new TodoEntity({ ...todo });
  }

  public toGraphql(todo: TodoEntity): TodoGraphql {
    return new TodoGraphql({ ...todo });
  }
}
