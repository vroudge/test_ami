import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

export enum TODO_STATUS {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

@Entity()
export class TodoEntity {
  constructor(props?: Partial<TodoEntity>) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  @Unique("vendorId", ["vendorId"])
  public vendorId: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ nullable: true, type: "text" })
  public description?: string;

  @Column({ type: "enum", enum: TODO_STATUS, default: TODO_STATUS.TODO })
  public status: TODO_STATUS;

  @Column({ type: "timestamptz", nullable: true })
  public completedAt?: Date;

  @CreateDateColumn({ type: "timestamptz" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  public updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  public deletedAt?: Date;
}
