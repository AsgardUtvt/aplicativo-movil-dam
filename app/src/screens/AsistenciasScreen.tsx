import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { useAsistenciaResponse } from "../hooks/useAsistenciaResponse";
import { BarChart } from "react-native-gifted-charts";

const C = {
    fondo: "#f1f5f9",   
    tarjeta: "#ffffff",
    borde: "#e2e8f0",
    texto: "#1e293b",
    suave: "#64748b",
    primario: "#1d4ed8",
    verde: "#059669",          
    naranja: "#d97706",        
    rojo: "#dc2626",
    azulClaro: "#dbeafe",
};

const Card = ({
    title,
    children,
    icon,
}: {
    title: string;
    children: React.ReactNode;
    icon?: string;
}) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            {icon && <Text style={styles.cardIcon}>{icon}</Text>}
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        {children}
    </View>
);

export const AsistenciasScreen = () => {
    const { isLoading, data, loadData } = useAsistenciaResponse();
    const { width } = useWindowDimensions();
    const chartWidth = width - 72;

    const registrosPorEstadoData = (data?.registrosPorEstado || []).map(
        (item, index) => ({
            value: item.total,
            label:
                item.estado.length > 9
                    ? item.estado.substring(0, 8) + "…"
                    : item.estado,
            frontColor: [C.verde, C.primario, C.naranja, C.rojo, "#7c3aed"][
                index % 5
            ],
            topLabelComponent: () => (
                <Text style={styles.barLabel}>{item.total}</Text>
            ),
        })
    );

    const retardosPorDiaData = (data?.retardosPorDiaSemana || []).map(
        (item) => ({
            value: item.retardos,
            label: item.dia.substring(0, 3),
            frontColor: C.naranja,
            topLabelComponent: () => (
                <Text style={styles.barLabel}>{item.retardos}</Text>
            ),
        })
    );

    const faltasSemanaData = (data?.faltasSemanaUnoVsDos || []).map((item) => ({
        value: item.faltas,
        label: `Semana ${item.semana}`,
        frontColor: item.semana === 1 ? C.primario : C.rojo,
        topLabelComponent: () => (
            <Text style={styles.barLabel}>{item.faltas}</Text>
        ),
    }));

    const topAlumnosFaltas = (data?.alumnosMasDeTresFaltas || [])
        .sort((a, b) => b.faltas - a.faltas)
        .slice(0, 8);

    const porcentajeAsistenciaOrdenado = (
        data?.porcentajeAsistencia || []
    ).sort((a, b) => b.porcentaje - a.porcentaje);

    if (isLoading && !data) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={C.primario} />
                <Text style={styles.loadingText}>Cargando información de asistencia...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={loadData}
                    tintColor={C.primario}
                    colors={[C.primario]}
                    progressBackgroundColor="#fff"
                />
            }
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Control de Asistencias</Text>
                <Text style={styles.headerSubtitle}>
                    Resumen general del grupo
                </Text>
            </View>

            <View style={styles.summaryRow}>
                <View style={[styles.summaryCard, { backgroundColor: "#eff6ff" }]}>
                    <Text style={styles.summaryNumber}>
                        {data?.totalAsistencia?.toLocaleString() ?? 0}
                    </Text>
                    <Text style={styles.summaryLabel}>Total registros</Text>
                </View>

                <View style={[styles.summaryCard, { backgroundColor: "#fef2f2" }]}>
                    <Text style={[styles.summaryNumber, { color: C.rojo }]}>
                        {data?.diaConMasFaltas?.faltas ?? 0}
                    </Text>
                    <Text style={styles.summaryLabel}>
                        Máx. faltas en un día
                    </Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Día con más faltas</Text>
                    <Text style={styles.infoValue}>
                        {data?.diaConMasFaltas
                            ? new Date(
                                  data.diaConMasFaltas.fecha
                              ).toLocaleDateString("es-MX", {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                              })
                            : "—"}
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Hora de entrada promedio</Text>
                    <Text style={styles.infoValue}>
                        {data?.horaEntradaPromedio?.hora_promedio
                            ? new Date(
                                  data.horaEntradaPromedio.hora_promedio
                              ).toLocaleTimeString("es-MX", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "—"}
                    </Text>
                </View>
            </View>

            <Card title="Registros por estado" icon="">
                {registrosPorEstadoData.length > 0 ? (
                    <BarChart
                        data={registrosPorEstadoData}
                        width={chartWidth}
                        height={190}
                        barWidth={34}
                        spacing={16}
                        roundedTop
                        roundedBottom
                        hideRules
                        xAxisThickness={0}
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: C.suave, fontSize: 11 }}
                        xAxisLabelTextStyle={{
                            color: C.suave,
                            fontSize: 11,
                        }}
                        noOfSections={4}
                        maxValue={
                            Math.max(
                                ...registrosPorEstadoData.map((d) => d.value)
                            ) * 1.25
                        }
                    />
                ) : (
                    <Text style={styles.empty}>Sin datos disponibles</Text>
                )}
            </Card>

            <Card title="Retardos por día de la semana" icon="">
                {retardosPorDiaData.length > 0 ? (
                    <BarChart
                        data={retardosPorDiaData}
                        width={chartWidth}
                        height={180}
                        barWidth={30}
                        spacing={20}
                        roundedTop
                        frontColor={C.naranja}
                        hideRules
                        xAxisThickness={0}
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: C.suave, fontSize: 11 }}
                        xAxisLabelTextStyle={{
                            color: C.suave,
                            fontSize: 12,
                        }}
                        noOfSections={5}
                    />
                ) : (
                    <Text style={styles.empty}>Sin datos de retardos</Text>
                )}
            </Card>

            <Card title="Comparativa de faltas por semana" icon="">
                {faltasSemanaData.length > 0 ? (
                    <BarChart
                        data={faltasSemanaData}
                        width={chartWidth}
                        height={170}
                        barWidth={55}
                        spacing={45}
                        roundedTop
                        hideRules
                        xAxisThickness={0}
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: C.suave }}
                        xAxisLabelTextStyle={{
                            color: C.texto,
                            fontSize: 13,
                            fontWeight: "500",
                        }}
                        noOfSections={4}
                    />
                ) : (
                    <Text style={styles.empty}>Sin datos semanales</Text>
                )}
            </Card>

            <Card title="Alumnos con más faltas" icon="">
                {topAlumnosFaltas.length > 0 ? (
                    topAlumnosFaltas.map((item, index) => (
                        <View key={item.alumno} style={styles.listItem}>
                            <View
                                style={[
                                    styles.rankBadge,
                                    index === 0 && { backgroundColor: C.rojo },
                                    index === 1 && { backgroundColor: C.naranja },
                                    index === 2 && { backgroundColor: "#ca8a04" },
                                ]}
                            >
                                <Text style={styles.rankText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.listText}>
                                Alumno {item.alumno}
                            </Text>
                            <Text style={[styles.listValue, { color: C.rojo }]}>
                                {item.faltas} faltas
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.empty}>
                        Ningún alumno con 3 o más faltas
                    </Text>
                )}
            </Card>

            <Card title="Alumnos con faltas consecutivas" icon="">
                {(data?.alumnosFaltasConsecutivas || []).length > 0 ? (
                    <View style={styles.chipsContainer}>
                        {data?.alumnosFaltasConsecutivas.map((item) => (
                            <View key={item.alumno} style={styles.chip}>
                                <Text style={styles.chipText}>
                                    Alumno {item.alumno}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.empty}>No hay alumnos en esta categoría</Text>
                )}
            </Card>

            <Card title="Porcentaje de asistencia" icon="">
                {porcentajeAsistenciaOrdenado.length > 0 ? (
                    porcentajeAsistenciaOrdenado.slice(0, 12).map((item) => (
                        <View key={item.alumno} style={styles.percentItem}>
                            <Text style={styles.listText}>
                                Alumno {item.alumno}
                            </Text>
                            <View style={styles.progressTrack}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        {
                                            width: `${Math.min(
                                                item.porcentaje,
                                                100
                                            )}%`,
                                            backgroundColor:
                                                item.porcentaje >= 90
                                                    ? C.verde
                                                    : item.porcentaje >= 75
                                                    ? C.primario
                                                    : C.rojo,
                                        },
                                    ]}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.percentValue,
                                    {
                                        color:
                                            item.porcentaje >= 90
                                                ? C.verde
                                                : item.porcentaje >= 75
                                                ? C.primario
                                                : C.rojo,
                                    },
                                ]}
                            >
                                {item.porcentaje.toFixed(0)}%
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.empty}>Sin datos de porcentaje</Text>
                )}
            </Card>

            <Card title="Faltas sin justificar" icon="">
                {(data?.faltasSinJustificar || []).length > 0 ? (
                    (data?.faltasSinJustificar || []).slice(0, 10).map(
                        (item, index) => (
                            <View
                                key={`${item.alumno}-${index}`}
                                style={styles.listItem}
                            >
                                <Text style={styles.listText}>
                                    Alumno {item.alumno}
                                </Text>
                                <Text style={styles.dateText}>
                                    {new Date(item.fecha).toLocaleDateString(
                                        "es-MX",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </Text>
                            </View>
                        )
                    )
                ) : (
                    <Text style={styles.empty}>
                        ¡Excelente! No hay faltas sin justificar
                    </Text>
                )}
            </Card>

            {(data?.alumnosSobrePromedioFaltas || []).length > 0 && (
                <Card title="Alumnos sobre el promedio de faltas" icon="">
                    {data?.alumnosSobrePromedioFaltas.map((item) => (
                        <View key={item.alumno} style={styles.listItem}>
                            <Text style={styles.listText}>
                                Alumno {item.alumno}
                            </Text>
                            <Text
                                style={[styles.listValue, { color: C.naranja }]}
                            >
                                {item.faltas} faltas
                            </Text>
                        </View>
                    ))}
                </Card>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.fondo,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.fondo,
    },
    loadingText: {
        marginTop: 14,
        fontSize: 15,
        color: C.suave,
    },
    header: {
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: C.texto,
    },
    headerSubtitle: {
        fontSize: 15,
        color: C.suave,
        marginTop: 4,
    },
    summaryRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 14,
    },
    summaryCard: {
        flex: 1,
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 14,
        alignItems: "center",
    },
    summaryNumber: {
        fontSize: 26,
        fontWeight: "700",
        color: C.primario,
    },
    summaryLabel: {
        fontSize: 13,
        color: C.suave,
        marginTop: 4,
        textAlign: "center",
    },
    infoRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    infoCard: {
        flex: 1,
        backgroundColor: C.tarjeta,
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: C.borde,
    },
    infoLabel: {
        fontSize: 12,
        color: C.suave,
        marginBottom: 6,
    },
    infoValue: {
        fontSize: 17,
        fontWeight: "600",
        color: C.texto,
    },
    card: {
        backgroundColor: C.tarjeta,
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: C.borde,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        maxHeight: 500,
        overflow: 'hidden'
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    cardIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: C.texto,
    },
    barLabel: {
        color: C.texto,
        fontSize: 11,
        fontWeight: "600",
        marginBottom: 4,
    },
    empty: {
        color: C.suave,
        fontStyle: "italic",
        textAlign: "center",
        paddingVertical: 16,
        fontSize: 14,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: C.borde,
    },
    rankBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: C.suave,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    rankText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
    listText: {
        flex: 1,
        color: C.texto,
        fontSize: 15,
    },
    listValue: {
        fontSize: 14,
        fontWeight: "600",
    },
    dateText: {
        fontSize: 13,
        color: C.suave,
    },
    chipsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    chip: {
        backgroundColor: "#fef3c7",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fde68a",
    },
    chipText: {
        color: "#92400e",
        fontSize: 13,
        fontWeight: "500",
    },
    percentItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: C.borde,
    },
    progressTrack: {
        flex: 1,
        height: 9,
        backgroundColor: "#e2e8f0",
        borderRadius: 5,
        marginHorizontal: 12,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 5,
    },
    percentValue: {
        width: 42,
        textAlign: "right",
        fontSize: 14,
        fontWeight: "600",
    },
});
