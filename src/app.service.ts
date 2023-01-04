/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ContentDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/content.dto';
import { RMQPayloadDto } from './submodules/backend/src/dtos/rmqPayload.dto';
import { PlatformEvents } from './submodules/backend/src/enums/platformEvents';
import { RmqTopics } from './submodules/backend/src/enums/rmqTopics';
import { MsgBrokerOpsService } from './submodules/backend/src/module/msg-broker-ops/msg-broker-ops.service';

@Injectable()
export class AppService {

  constructor(
    @Inject('CONTENT_SERVICE_QUEUE') private contentQueueClient: ClientProxy,

    private readonly msgBrokerService: MsgBrokerOpsService,
  ){}

  getHello(): string {

    console.log("Step 2")
    
    let rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_CREATION,
      payload: {
        "title": "Test"
      }
    }

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_CREATION_TOPIC,
      this.contentQueueClient
    )
    
    return "emit successful"
    
  }

  async createContent(content: ContentDto){
    console.log("Proceeding to create content")
    let rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_CREATION,
      payload: content
    }

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_CREATION_TOPIC,
      this.contentQueueClient
    )
    
    return "Your request has been accepted !!"
  }
}