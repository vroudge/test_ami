import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../../infra/todo/todo.repository";
import { TodoEntity } from "../../../infra/todo/todo.entity";
import { UpdateTodoCommand } from "./update-todo.command";
import { TodoUpdatedEvent } from "../../events/todo-updated.event";

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    protected repository: TodoRepository,
    protected eventBus: EventBus,
  ) {}

  async execute({ command: { todo } }: UpdateTodoCommand): Promise<void> {
    // provided no internal id and only a vendor id, this an external todo being created or updated
    if (!todo.id && todo?.vendorId) {
      await this.upsertExternalTodo(todo);
    }
  }

  private async upsertExternalTodo(task: TodoEntity) {
    const todo = await this.repository.findTodos({
      vendorIds: [task.vendorId],
    });
    let updatedModel: TodoEntity;
    if (!todo.length) {
      updatedModel = await this.repository.createTodo(
        task.title,
        task?.description,
        task?.status,
        task.vendorId,
        task?.completedAt,
      );
    } else {
      updatedModel = await this.repository.updateTodo(
        todo[0].id,
        task.title,
        task?.description,
        task?.status,
        task?.updatedAt,
      );
    }

    this.eventBus.publish(new TodoUpdatedEvent({ todoId: updatedModel.id }));
    console.log("published");
  }
}
