/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { Content } from './submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { User } from './submodules/backend-refresher-1.0-entities/src/entities/user.entity';
import { queues } from './submodules/backend/src/constants/rmqQueue';
import { MsgBrokerOpsService } from './submodules/backend/src/module/msg-broker-ops/msg-broker-ops.service';;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'backend-socialmedia',
      entities: [ User, Content ],
      synchronize: true,
      logging: false
    }),
    ClientsModule.register([
      {
        name:'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://pkcsycvu:He6SqROu8yJHFqHM-tYzQ2htI79Wq1zo@shrimp.rmq.cloudamqp.com/pkcsycvu"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }
        
        },
      },
    ]),
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService,MsgBrokerOpsService],
})
export class AppModule {}
