import { TodoUpdatedEvent } from "./todo-updated.event";
import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedEventHandler
  implements IEventHandler<TodoUpdatedEvent>
{
  handle(event: TodoUpdatedEvent) {
    console.log("event", event);
    throw new Error("derps");
  }
}
