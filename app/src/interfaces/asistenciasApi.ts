export interface AsistenciaResponse {
        totalAsistencia:                     number;
        registrosPorEstado:                  RegistrosPorEstado[];
        faltasSinJustificar:                 FaltasSinJustificar[];
        faltasCadaAlumno:                    AlumnosMasDeTresFalta[];
        porcentajeAsistencia:                PorcentajeAsistencia[];
        alumnosMasDeTresFaltas:              AlumnosMasDeTresFalta[];
        diaConMasFaltas:                     DiaConMasFaltas;
        horaEntradaPromedio:                 HoraEntradaPromedio;
        retardosPorDiaSemana:                RetardosPorDiaSemana[];
        alumnosFaltasConsecutivas:           AlumnosFaltasConsecutiva[];
        alumnosAsistenciaPerfecta:           unknown[];
        faltasSemanaUnoVsDos:                FaltasSemanaUnoVsDo[];
        alumnosSobrePromedioFaltas:          AlumnosMasDeTresFalta[];
        observacionesFrecuentesJustificadas: unknown[];
}

export interface AlumnosFaltasConsecutiva {
        alumno: number;
}

export interface AlumnosMasDeTresFalta {
        alumno: number;
        faltas: number;
}

export interface DiaConMasFaltas {
        fecha:  Date;
        faltas: number;
}

export interface FaltasSemanaUnoVsDo {
        semana: number;
        faltas: number;
}

export interface FaltasSinJustificar {
        fecha:  Date;
        alumno: number;
}

export interface HoraEntradaPromedio {
        hora_promedio: Date;
}

export interface PorcentajeAsistencia {
        alumno:     number;
        porcentaje: number;
}

export interface RegistrosPorEstado {
        estado: string;
        total:  number;
}

export interface RetardosPorDiaSemana {
        dia:      string;
        retardos: number;
}
