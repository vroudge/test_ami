export class TrelloCardDto {
  constructor(props: TrelloCardDto) {
    Object.assign(this, props);
  }

  public id: string;

  public name: string;

  public listName: string;

  public closed: boolean = false;

  public createdAt?: Date;

  public updatedAt?: Date;

  public content?: string;
}
