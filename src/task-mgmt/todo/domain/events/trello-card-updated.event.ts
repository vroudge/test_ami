import { TrelloCardDto } from "../../dtos/trello-card.dto";

export class TrelloCardUpdatedEvent {
  constructor(props: TrelloCardUpdatedEvent) {
    Object.assign(this, props);
  }

  public trelloCard: TrelloCardDto;
}
