export interface AutosResponse {

    id_propietario: number;

    marca: string;

    modelo: string;

    ano: Date;

    placas: string;

    numero_serie: string;

    color: string;

    kilometraje: string;

    fecha_revision: Date;

    imagen1?: Buffer;

    imagen2?: Buffer;

    imagen3?: Buffer;

    imagen4?: Buffer;
}
