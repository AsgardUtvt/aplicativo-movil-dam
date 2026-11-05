import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('auto')
export class Auto {

    @PrimaryGeneratedColumn()
    id_propietario: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column({ type: 'nvarchar' })
    ano: string;

    @Column()
    placas: string;

    @Column()
    numero_serie: string;

    @Column()
    color: string;

    @Column()
    kilometraje: string;

    @Column({ type: 'datetime2' })
    fecha_revision: Date;

    @Column({ type: 'varbinary', length: 'max', nullable: true })
    imagen1: Buffer | null;

    @Column({ type: 'varbinary', length: 'max', nullable: true })
    imagen2: Buffer | null;

    @Column({ type: 'varbinary', length: 'max', nullable: true })
    imagen3: Buffer | null;

    @Column({ type: 'varbinary', length: 'max', nullable: true })
    imagen4: Buffer | null;
}
