import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auto } from './entities/auto.entity.js';
import { CreateAutoDto } from './dto/create-auto.dto.js';
import { UpdateAutoDto } from './dto/update-auto.dto.js';

@Injectable()
export class AutosService {
    constructor(
        @InjectRepository(Auto, "mssql-connection")
        private readonly autoRepository: Repository<Auto>,
    ) {}

    private base64ToBuffer(base64String: string | undefined): Buffer | null {
        if (!base64String) return null;
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        return Buffer.from(base64Data, 'base64');
    }

    // ← NUEVO: convierte Buffer a base64 limpio
    private bufferToBase64(buffer: Buffer | null): string | null {
        if (!buffer) return null;
        return buffer.toString('base64');
    }

    // ← NUEVO: transforma un auto completo
    private transformAuto(auto: Auto) {
        return {
            ...auto,
            imagen1: this.bufferToBase64(auto.imagen1),
            imagen2: this.bufferToBase64(auto.imagen2),
            imagen3: this.bufferToBase64(auto.imagen3),
            imagen4: this.bufferToBase64(auto.imagen4),
        };
    }

    async create(createAutoDto: CreateAutoDto) {
        const auto = this.autoRepository.create({
            marca: createAutoDto.marca,
            modelo: createAutoDto.modelo,
            ano: String(createAutoDto.ano),
            placas: createAutoDto.placas,
            numero_serie: createAutoDto.numero_serie,
            color: createAutoDto.color,
            kilometraje: createAutoDto.kilometraje,
            fecha_revision: new Date(createAutoDto.fecha_revision),
            imagen1: this.base64ToBuffer(createAutoDto.imagen1),
            imagen2: this.base64ToBuffer(createAutoDto.imagen2),
            imagen3: this.base64ToBuffer(createAutoDto.imagen3),
            imagen4: this.base64ToBuffer(createAutoDto.imagen4),
        });

        const saved = await this.autoRepository.save(auto);
        return this.transformAuto(saved);
    }

    async findAll() {
        const autos = await this.autoRepository.find();
        return autos.map(auto => this.transformAuto(auto));
    }

    async findOne(id_propietario: number) {
        const auto = await this.autoRepository.findOne({ where: { id_propietario } });
        if (!auto) {
            throw new NotFoundException(`Auto con propietario ${id_propietario} no encontrado`);
        }
        return this.transformAuto(auto);
    }

    async update(id_propietario: number, updateAutoDto: UpdateAutoDto) {
        const auto = await this.autoRepository.findOne({ where: { id_propietario } });
        if (!auto) {
            throw new NotFoundException(`Auto con propietario ${id_propietario} no encontrado`);
        }

        const updatedData: any = {};

        if (updateAutoDto.marca !== undefined) updatedData.marca = updateAutoDto.marca;
        if (updateAutoDto.modelo !== undefined) updatedData.modelo = updateAutoDto.modelo;
        if (updateAutoDto.ano !== undefined) updatedData.ano = updateAutoDto.ano;
        if (updateAutoDto.placas !== undefined) updatedData.placas = updateAutoDto.placas;
        if (updateAutoDto.numero_serie !== undefined) updatedData.numero_serie = updateAutoDto.numero_serie;
        if (updateAutoDto.color !== undefined) updatedData.color = updateAutoDto.color;
        if (updateAutoDto.kilometraje !== undefined) updatedData.kilometraje = updateAutoDto.kilometraje;
        if (updateAutoDto.fecha_revision !== undefined) {
            updatedData.fecha_revision = new Date(updateAutoDto.fecha_revision);
        }
        if (updateAutoDto.imagen1 !== undefined) updatedData.imagen1 = this.base64ToBuffer(updateAutoDto.imagen1);
        if (updateAutoDto.imagen2 !== undefined) updatedData.imagen2 = this.base64ToBuffer(updateAutoDto.imagen2);
        if (updateAutoDto.imagen3 !== undefined) updatedData.imagen3 = this.base64ToBuffer(updateAutoDto.imagen3);
        if (updateAutoDto.imagen4 !== undefined) updatedData.imagen4 = this.base64ToBuffer(updateAutoDto.imagen4);

        await this.autoRepository.update({ id_propietario }, updatedData);
        
        const updated = await this.autoRepository.findOne({ where: { id_propietario } });
        return this.transformAuto(updated!);
    }

    async remove(id_propietario: number) {
        const auto = await this.autoRepository.findOne({ where: { id_propietario } });
        if (!auto) {
            throw new NotFoundException(`Auto con propietario ${id_propietario} no encontrado`);
        }
        await this.autoRepository.remove(auto);
        return { message: 'Auto eliminado correctamente' };
    }
}
