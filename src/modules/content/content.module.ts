/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { User } from 'src/submodules/backend-refresher-1.0-entities/src/entities/user.entity';
import ContentController from './content.controller';
import { ContentService } from './content.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Content])
      ],
      controllers: [ContentController],
      providers: [ContentService],
})
export class ContentModule {}
