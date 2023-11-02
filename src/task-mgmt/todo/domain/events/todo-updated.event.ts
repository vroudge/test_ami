export class TodoUpdatedEvent {
  constructor(props: TodoUpdatedEvent) {
    Object.assign(this, props);
  }

  public todoId: string;
}
