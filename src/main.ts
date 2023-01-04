/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
//import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ["amqps://pkcsycvu:He6SqROu8yJHFqHM-tYzQ2htI79Wq1zo@shrimp.rmq.cloudamqp.com/pkcsycvu"],
      queue: "CONTENT_SERVICE_QUEUE",
      queueOptions: {
        durable: true,
      },
    },
  });
  
  await app.startAllMicroservices();
  
  await app.listen(5000);
}
bootstrap();
