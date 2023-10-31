import { TODO_STATUS, TodoEntity } from "../infra/todo/todo.entity";
import { TrelloCardDto } from "./trello-card.dto";
import { Injectable } from "@nestjs/common";

export enum TRELLO_LIST_NAME {
  "To do" = "To do",
  "In progress" = "In progress",
  "Done" = "Done",
}

@Injectable()
export class TrelloMapper {
  public toTodo(trelloTask: TrelloCardDto): TodoEntity {
    return new TodoEntity({
      vendorId: trelloTask.id,
      description: trelloTask.content,
      title: trelloTask.name,
      createdAt: trelloTask.createdAt,
      updatedAt: trelloTask.updatedAt,
      status: this.toTodoStatus(trelloTask.listName as TRELLO_LIST_NAME),
    });
  }

  // public toTrello(todo: TodoEntity): TodoGraphql {
  // return new TodoGraphql({ ...todo });
  // }

  protected toTrelloList(todoStatus: TODO_STATUS): TRELLO_LIST_NAME {
    switch (todoStatus) {
      case TODO_STATUS.TODO:
        return TRELLO_LIST_NAME["To do"];
      case TODO_STATUS.IN_PROGRESS:
        return TRELLO_LIST_NAME["In progress"];
      case TODO_STATUS.DONE:
        return TRELLO_LIST_NAME["Done"];
    }
  }

  protected toTodoStatus(trelloListName: TRELLO_LIST_NAME): TODO_STATUS {
    switch (trelloListName) {
      case TRELLO_LIST_NAME["To do"]:
        return TODO_STATUS.TODO;
      case TRELLO_LIST_NAME["In progress"]:
        return TODO_STATUS.IN_PROGRESS;
      case TRELLO_LIST_NAME["Done"]:
        return TODO_STATUS.DONE;
    }
  }
}
