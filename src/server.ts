import { NestFactory } from "@nestjs/core";
import { AppModule } from "./task-mgmt/app.module";
import { Logger } from "@nestjs/common";

const start = async (): Promise<void> => {
  try {
    const logger = new Logger();
    // create the NestJS application
    const app = await NestFactory.create(AppModule);

    // start listening
    const port = process.env?.HTTP_PORT ?? 8080;
    await app.listen(process.env?.HTTP_PORT ?? 8080);
    logger.log(`Application listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
};

start();
