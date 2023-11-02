import { Body, Controller, Get, Post } from "@nestjs/common";
import { TrelloCardDto } from "../../dtos/trello-card.dto";
import { CommandBus } from "@nestjs/cqrs";
import { TrelloMapper } from "../../dtos/trello.mapper";
import { UpdateTodoCommand } from "../../domain/commands/update-todo/update-todo.command";

@Controller("webhooks")
export class WebhooksController {
  constructor(
    protected readonly mapper: TrelloMapper,
    protected readonly cmdBus: CommandBus,
  ) {}

  protected readonly HANDLED_ACTION_TYPES = ["createCard", "updateCard"];

  @Get("/trello")
  public async check(@Body() body: any): Promise<{ ok: boolean }> {
    return { ok: true };
  }
  @Post("/trello")
  public async trelloWebhook(@Body() body: any): Promise<void> {
    const trelloCardData = body.action.data;
    console.log(body.action);
    const trelloCard = new TrelloCardDto({
      id: trelloCardData.card.id,
      name: trelloCardData.card.name,
      listName: trelloCardData?.listAfter?.name || trelloCardData?.list?.name,
      content: trelloCardData?.card.desc,
      closed: trelloCardData?.card.closed,
      // createdAt: body.action.date,
      // updatedAt: body.action.date,
    });

    const todo = this.mapper.toTodo(trelloCard);

    await this.cmdBus.execute(new UpdateTodoCommand({ todo }));
  }
}
