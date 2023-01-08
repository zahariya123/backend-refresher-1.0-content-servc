/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */

import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { RMQPayloadDto } from "src/submodules/backend/src/dtos/rmqPayload.dto";
import { RmqTopics } from "src/submodules/backend/src/enums/rmqTopics";
import { ContentService } from "./content.service";

@Controller('content')
export default class ContentController{

    /*
    - post creation (rmq) ---> done
    - fetch post (http)
    - delete post (http)
    - update post  (rmq)
    */

    constructor(private readonly contentService: ContentService) {}
   
    @EventPattern(RmqTopics.CONTENT_CREATION_TOPIC)
    async createContent(data: any) {
      try{
        let rmqPayload: RMQPayloadDto = data.payload

        console.log("Received content dto : ",rmqPayload)
  
        await this.contentService.createContent(rmqPayload.payload)
      }
      catch(err){
        console.log(err)
      }
      
      
  }
}