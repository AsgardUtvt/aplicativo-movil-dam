import { IsString, MinLength, IsDateString, IsOptional, MaxLength, IsNumber } from "class-validator";

export class CreateAutoDto {
    
    @IsNumber()
    id_propietario: number;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    marca: string;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    modelo: string;

    @IsString()
    @IsOptional()
    ano: Date;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    placas: string;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    numero_serie: string;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    color: string;

    @IsString()
    @MaxLength(255)
    @MinLength(5)
    kilometraje: string;

    @IsOptional()
    fecha_revision: string;

    @IsString()
    @IsOptional()
    imagen1?: string;

    @IsString()
    @IsOptional()
    imagen2?: string;

    @IsString()
    @IsOptional()
    imagen3?: string;

    @IsString()
    @IsOptional()
    imagen4?: string;
    
}
