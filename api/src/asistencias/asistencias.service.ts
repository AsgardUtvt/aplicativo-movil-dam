import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto.js';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Asistencia} from './entities/asistencia.entity.js';
import {Repository} from 'typeorm';
import { Estado } from './entities/asistencia.entity.js';

@Injectable()
export class AsistenciasService {
    constructor (
        @InjectRepository(Asistencia, "mssql-connection")
        private asistenciaRepository: Repository<Asistencia>
    ){}
    async create(createAsistenciaDto: CreateAsistenciaDto) {
        const register = this.asistenciaRepository.create(createAsistenciaDto);
        return await this.asistenciaRepository.save(register)

    }

    async findAll() {
        return await this.asistenciaRepository.find();
    }

    async  findOne(id: number) {
        return await this.asistenciaRepository.findBy({ id });
    }

    async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
        return await this.asistenciaRepository.update( id, updateAsistenciaDto)
    }

    async remove(id: number) {
        return await this.asistenciaRepository.delete(id);
    }
    async paginado ( pagina: number = 1, limite: number = 50, baseUrl: string ){
        /*
      (pagina 2)
      SELECT * FROM sensor
      ORDER BY id_sensor DESC
      LIMIT 50 OFFSET 50;
         * */
        const data = await this.asistenciaRepository.find({
            order: { id: 'DESC' },
            skip: (pagina - 1) * limite,
            take: limite
        });

        const next = `${baseUrl}?pagina=${pagina + 1}&limite=${limite}`;

        const prev = `${baseUrl}?pagina=${ (pagina - 1 > 0)  ? pagina -1 : 0}&limite=${limite}`;

        const author = 'Author: Pandora XDN'

        return {
            author,
            next,
            prev,
            data
        }
    }

    async insertMasivo(lecturas: Partial<Asistencia>[], tamanoLote = 400){
        for(let i = 0; i < lecturas.length; i += tamanoLote){
            await this.asistenciaRepository
                .createQueryBuilder()
                .insert()
                .into(Asistencia)
                .values(lecturas.slice(i, i + tamanoLote))
                .execute();
        }
    }

    private async totalAsistencia() {
        return await this.asistenciaRepository.count();
    }

    private async registrosPorEstado() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.estado', 'estado')
            .addSelect('COUNT(*)', 'total')
            .groupBy('a.estado')
            .getRawMany();
    }

    private async faltasSinJustificar() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.fecha', 'fecha')
            .addSelect('a.alumno_id', 'alumno')
            .where('a.estado = :estado', { estado: Estado.falta })
            .orderBy('a.fecha', 'DESC')
            .getRawMany();
    }

    private async faltasCadaAlumno() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.alumno_id', 'alumno')
            .addSelect('COUNT(*)', 'faltas')
            .where('a.estado = :estado', { estado: Estado.falta })
            .groupBy('a.alumno_id')
            .getRawMany();
    }

    private async porcentajeAsistencia() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.alumno_id', 'alumno')
            .addSelect('CAST(100.0 * SUM(CASE WHEN a.estado IN (:...presentes) THEN 1 ELSE 0 END) / COUNT(*) AS DECIMAL(5,2))', 'porcentaje')
            .setParameters({ presentes: [Estado.asistio, Estado.retardo] })
            .groupBy('a.alumno_id')
            .getRawMany();
    }

    private async alumnosMasDeTresFaltas() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.alumno_id', 'alumno')
            .addSelect('COUNT(*)', 'faltas')
            .where('a.estado = :estado', { estado: Estado.falta })
            .groupBy('a.alumno_id')
            .having('COUNT(*) > 3')
            .getRawMany();
    }

    private async diaConMasFaltas() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.fecha', 'fecha')
            .addSelect('COUNT(*)', 'faltas')
            .where('a.estado = :estado', { estado: Estado.falta })
            .groupBy('a.fecha')
            .orderBy('COUNT(*)', 'DESC')
            .offset(0)
            .limit(1)
            .getRawOne();
    }

    private async horaEntradaPromedio() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select("CAST(DATEADD(SECOND, CAST(AVG(CAST(DATEDIFF(SECOND, CAST('00:00:00' AS TIME), CAST(a.hora_entrada AS TIME)) AS FLOAT)) AS INT), CAST('00:00:00' AS TIME)) AS TIME)", 'hora_promedio')
            .where('a.estado = :estado', { estado: Estado.asistio })
            .getRawOne();
    }

    private async retardosPorDiaSemana() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('DATENAME(WEEKDAY, a.fecha)', 'dia')
            .addSelect('COUNT(*)', 'retardos')
            .where('a.estado = :estado', { estado: Estado.retardo })
            .groupBy('DATENAME(WEEKDAY, a.fecha)')
            .orderBy('MIN(DATEPART(WEEKDAY, a.fecha))', 'ASC')
            .getRawMany();
    }

    // private async registrosConAlumno() {
    //     return await this.asistenciaRepository
    //         .createQueryBuilder('a')
    //         .innerJoin('alumno', 'al', 'al.id = a.alumno_id')
    //         .select('a.id', 'id')
    //         .addSelect('a.fecha', 'fecha')
    //         .addSelect('a.estado', 'estado')
    //         .addSelect('al.nombre', 'nombre')
    //         .addSelect('al.apellido', 'apellido')
    //         .addSelect('al.grado', 'grado')
    //         .addSelect('al.grupo', 'grupo')
    //         .getRawMany();
    // }
    //
    // private async porcentajePorGradoGrupo() {
    //     return await this.asistenciaRepository
    //         .createQueryBuilder('a')
    //         .innerJoin('alumno', 'al', 'al.id = a.alumno_id')
    //         .select('al.grado', 'grado')
    //         .addSelect('al.grupo', 'grupo')
    //         .addSelect('CAST(100.0 * SUM(CASE WHEN a.estado IN (:...presentes) THEN 1 ELSE 0 END) / COUNT(*) AS DECIMAL(5,2))', 'porcentaje')
    //         .setParameters({ presentes: [Estado.asistio, Estado.retardo] })
    //         .groupBy('al.grado')
    //         .addGroupBy('al.grupo')
    //         .getRawMany();
    // }
    //
    private async alumnosAsistenciaPerfecta() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.alumno_id', 'alumno')
            .groupBy('a.alumno_id')
            .having('SUM(CASE WHEN a.estado IN (:...ausencias) THEN 1 ELSE 0 END) = 0', { ausencias: [Estado.falta, Estado.retardo] })
            .getRawMany();
    }

    async faltasSemanaUnoVsDos() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .innerJoin('(SELECT MIN(fecha) AS min_fecha FROM asistencia)', 'm', '1=1')
            .select('CASE WHEN DATEDIFF(DAY, m.min_fecha, a.fecha) < 7 THEN 1 ELSE 2 END', 'semana')
            .addSelect('COUNT(*)', 'faltas')
            .where('a.estado = :estado', { estado: Estado.falta })
            .groupBy('CASE WHEN DATEDIFF(DAY, m.min_fecha, a.fecha) < 7 THEN 1 ELSE 2 END')
            .orderBy('semana', 'ASC')
            .getRawMany();
    }
    private async alumnosFaltasConsecutivas() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .innerJoin(Asistencia, 'b', 'b.alumno_id = a.alumno_id AND CAST(b.fecha AS DATE) = CAST(DATEADD(DAY, 1, a.fecha) AS DATE) AND b.estado = :estado', { estado: Estado.falta })
            .select('DISTINCT a.alumno_id', 'alumno')
            .where('a.estado = :estado')
            .getRawMany();
    }

    private async alumnosSobrePromedioFaltas() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.alumno_id', 'alumno')
            .addSelect('COUNT(*)', 'faltas')
            .where('a.estado = :estado', { estado: Estado.falta })
            .groupBy('a.alumno_id')
            .having('COUNT(*) > (SELECT AVG(CAST(x.total AS FLOAT)) FROM (SELECT COUNT(*) AS total FROM asistencia WHERE estado = :estado GROUP BY alumno_id) x)')
            .getRawMany();
    }

    private async observacionesFrecuentesJustificadas() {
        return await this.asistenciaRepository
            .createQueryBuilder('a')
            .select('a.observacion', 'observacion')
            .addSelect('COUNT(*)', 'veces')
            .where('a.estado = :estado', { estado: Estado.justificacion })
            .andWhere('a.observacion IS NOT NULL')
            .groupBy('a.observacion')
            .orderBy('COUNT(*)', 'DESC')
            .getRawMany();
    }

    async data_asistencia() {
        const totalAsistencia = await this.totalAsistencia();
        const registrosPorEstado = await this.registrosPorEstado();
        const faltasSinJustificar = await this.faltasSinJustificar();
        const faltasCadaAlumno = await this.faltasCadaAlumno();
        const porcentajeAsistencia = await this.porcentajeAsistencia();
        const alumnosMasDeTresFaltas = await this.alumnosMasDeTresFaltas();
        const diaConMasFaltas = await this.diaConMasFaltas();
        const horaEntradaPromedio = await this.horaEntradaPromedio();
        const retardosPorDiaSemana = await this.retardosPorDiaSemana();
        // const registrosConAlumno = await this.registrosConAlumno();
        // const porcentajePorGradoGrupo = await this.porcentajePorGradoGrupo();
        const alumnosFaltasConsecutivas = await this.alumnosFaltasConsecutivas();
        const alumnosAsistenciaPerfecta = await this.alumnosAsistenciaPerfecta();
        const faltasSemanaUnoVsDos = await this.faltasSemanaUnoVsDos();
        const alumnosSobrePromedioFaltas = await this.alumnosSobrePromedioFaltas();
        const observacionesFrecuentesJustificadas = await this.observacionesFrecuentesJustificadas();

        return {
            totalAsistencia,
            registrosPorEstado,
            faltasSinJustificar,
            faltasCadaAlumno,
            porcentajeAsistencia,
            alumnosMasDeTresFaltas,
            diaConMasFaltas,
            horaEntradaPromedio,
            retardosPorDiaSemana,
            // registrosConAlumno,
            // porcentajePorGradoGrupo,
            alumnosFaltasConsecutivas,
            alumnosAsistenciaPerfecta,
            faltasSemanaUnoVsDos,
            alumnosSobrePromedioFaltas,
            observacionesFrecuentesJustificadas
        }
    }
}






