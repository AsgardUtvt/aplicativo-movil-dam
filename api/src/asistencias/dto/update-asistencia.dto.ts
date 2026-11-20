import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaDto } from './create-asistencia.dto.js';

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {}
