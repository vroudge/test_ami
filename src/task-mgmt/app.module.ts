import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TodoModule } from "./todo/todo.module";
import { TodoEntity } from "./todo/infra/todo.entity";
import { CqrsModule } from "@nestjs/cqrs";
@Module({
  imports: [
    TodoModule,
    // deals with setting up the graphql server, the playground, etc.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/public/schema.gql"),
      playground: true,
    }),
    // Deals with setting up the database connection.
    // For the sake of simplicity, the variables are here
    // and set to synchronize=true to not lose time with migrations.
    // In a real world application, one should use migrations
    // and environment variables should be injected to the application ctx
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "todo",
      entities: [TodoEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
