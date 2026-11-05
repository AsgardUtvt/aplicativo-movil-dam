import { Module } from '@nestjs/common';
import { AutosService } from './autos.service.js';
import { AutosController } from './autos.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Auto} from './entities/auto.entity.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Auto
        ], "mssql-connection"),
    ],
  controllers: [AutosController],
  providers: [AutosService],
})
export class AutosModule {}
