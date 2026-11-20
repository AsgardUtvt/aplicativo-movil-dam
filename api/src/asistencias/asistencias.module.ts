import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service.js';
import { AsistenciasController } from './asistencias.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Asistencia} from './entities/asistencia.entity.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([Asistencia], 'mssql-connection'),
    ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
