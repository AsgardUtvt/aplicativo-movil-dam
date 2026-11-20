import {IsDateString, IsEnum, IsInt, IsOptional, IsString, Matches} from "class-validator";
import {Estado} from "../entities/asistencia.entity.js";

export class CreateAsistenciaDto {

    @IsInt()
    @IsOptional()
    id: number;

    @IsInt()
    alumno_id: number;

    @IsDateString()
    @IsOptional()
    fecha: string;

    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
    @IsOptional()
    hora_entrada: string;

    @IsEnum(Estado)
    @IsOptional()
    estado: Estado;

    @IsString()
    @IsOptional()
    observacion: string;
}
