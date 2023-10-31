import { Body, Controller, Get, Post } from "@nestjs/common";
import { TrelloCardDto } from "../../dtos/trello-card.dto";
import { EventBus } from "@nestjs/cqrs";

@Controller("webhooks")
export class WebhooksController {
  constructor(protected readonly eventBus: EventBus) {}

  @Get("/trello")
  public async check(@Body() body: any): Promise<{ ok: boolean }> {
    return { ok: true };
  }
  @Post("/trello")
  public async trelloWebhook(@Body() body: any): Promise<void> {
    const trelloCardData = body.action.data.card;
    const trelloCardListAfter = body.action.data.listAfter;

    const trelloTask = new TrelloCardDto({
      id: trelloCardData.id,
      name: trelloCardData.name,
      listName: trelloCardListAfter.name,
      content: trelloCardData?.desc,
      createdAt: body.action.date,
      updatedAt: body.action.date,
    });
  }
}
