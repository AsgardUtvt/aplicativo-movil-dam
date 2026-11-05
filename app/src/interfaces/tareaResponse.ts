export enum EstadoTarea {
    pendiente = "Pendiente",
    en_proceso = "En proceso",
    completado = "Completado"
}

export interface Tarea {
    id_tarea: number;
    titulo: string;
    descripcion: string;
    estado: string;
} 

