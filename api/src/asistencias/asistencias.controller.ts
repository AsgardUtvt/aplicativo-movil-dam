import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service.js';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto.js';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto.js';
import * as express from 'express';
import {Asistencia} from './entities/asistencia.entity.js';

@Controller('asistencia')
export class AsistenciasController {
    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Post()
    create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
        return this.asistenciasService.create(createAsistenciaDto);
    }

    @Get()
    findAll() {
        return this.asistenciasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.asistenciasService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
        return this.asistenciasService.update(+id, updateAsistenciaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.asistenciasService.remove(+id);
    }

    @Get('consultas/data')
    data_asisetncia(){
        return this.asistenciasService.data_asistencia();
    }

    @Get('consultas/paginado')
    paginado( @Query('pagina') pagina: number = 1, @Query('limite') limite: number = 50, @Req() request: express.Request) {
        const baseUrl = `${request.protocol}://${request.host}${request.baseUrl}/asisetncia/consultas/paginado`;
        return this.asistenciasService.paginado( pagina, limite, baseUrl );
    }

    @Post('masivo')
    async interMasivo( @Body() lecturas: Asistencia[] ) {
        await this.asistenciasService.insertMasivo(lecturas)
        return { datos_ingresados: lecturas.length };
    }



}
