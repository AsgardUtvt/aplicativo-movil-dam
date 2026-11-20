import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


export enum Estado{
    asistio = 'asistio',
        retardo= 'retardo',
        falta = 'falta',
        justificacion = 'justificacion'
}

@Entity()
export class Asistencia {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    alumno_id: number;

    @Column({ type: 'date'})
    fecha: string;

    @Column({ type: 'time', nullable: true})
    hora_entrada: string | null;

    @Column({
        type: 'varchar',
        length: '20',
        default: Estado.falta
    })
    estado: Estado;

    @Column({ type: 'varchar', length: 255, nullable: true})
    observacion: string;


}
