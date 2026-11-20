import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl } from 'react-native';
import { useDataResponse } from '../hooks/useDataResponse';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';

const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#94a3b8',
  frio: '#38bdf8',
  calor: '#f87171',
  top: '#fb923c',
  verde: '#34d399',
  morado: '#a78bfa',
};

export const DataResponseScreen = () => {
  const { isLoading, data, loadData } = useDataResponse();
  const { width } = useWindowDimensions();

  type Fecha = Date | string;
  type Punto = { value: number; label?: string };

  const hora = (f: Fecha) => {
    const d = new Date(f);
    if (isNaN(d.getTime())) return '--:--';
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const dia = (f: Fecha) => {
    const d = new Date(f);
    if (isNaN(d.getTime())) return '--/--';
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const estiloEjes = {
    xAxisLabelTextStyle: { color: C.suave, fontSize: 10 },
    yAxisTextStyle: { color: C.suave, fontSize: 10 },
    xAxisColor: C.borde,
    yAxisColor: C.borde,
    rulesColor: C.borde,
    rulesType: 'solid' as const,
    noOfSections: 4,
    isAnimated: true,
  };

  const Tarjeta = ({
    titulo,
    subtitulo,
    children,
  }: {
    titulo: string;
    subtitulo?: string;
    children: ReactNode;
  }) => (
    <View style={style.tarjeta}>
      <Text style={style.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={style.sub}>{subtitulo}</Text> : null}
      <View style={{ marginTop: 16 }}>{children}</View>
    </View>
  );

  const Stat = ({
    label,
    valor,
    color,
  }: {
    label: string;
    valor: number;
    color: string;
  }) => (
    <View style={{ ...style.stat, borderTopColor: color }}>
      <Text style={style.sub}>{label}</Text>
      <Text style={{ ...style.statValor, backgroundColor: color }}>
        {Number(valor).toFixed(1)} C
      </Text>
    </View>
  );

  const GraficoArea = ({
    datos,
    color,
  }: {
    datos: Punto[];
    color: string;
  }) => (
    <LineChart
      {...estiloEjes}
      data={datos}
      color={color}
      width={width - 122}
      adjustToWidth
      curved
      areaChart
      thickness={3}
      startFillColor={color}
      endFillColor={color}
      startOpacity={0.35}
      endOpacity={0.05}
      hideDataPoints
      spacing={datos.length > 8 ? 28 : 36}
      initialSpacing={10}
      backgroundColor={C.tarjeta}
    />
  );

  const renderLegend = (text: string, color: string) => (
    <View style={style.leyendaItem}>
      <View style={[style.leyendaColor, { backgroundColor: color }]} />
      <Text style={style.leyendaTexto}>{text}</Text>
    </View>
  );

  if (!data) {
    return (
      <View style={appTheme.container}>
        <Text style={appTheme.text}>Cargando...</Text>
      </View>
    );
  }

  const { total, estadistica } = data;

  const temperatura = data.ultimasHoras.map((a) => ({
    value: Number(a.temperatura_celcius),
    label: hora(a.fecha),
  }));

  const distancia = data.alertas.map((a) => ({
    value: Number(a.distancia_cm),
    label: hora(a.fecha),
  }));

  const diasFrios = data.diasFrios.map((d) => ({
    value: Number(d.promedio),
    label: dia(d.dia),
  }));

  const diasCalurosos = data.diasCalurosos.map((d) => ({
    value: Number(d.promedio),
    label: dia(d.dia),
  }));

  const top = data.topTemperaturas.map((a) => ({
    value: Number(a.temperatura_celcius),
    label: hora(a.fecha),
  }));

  const totalLecturasDia =
    data.hoy.length + data.ayer.length + data.anteayer.length;

  const pieData = [
    {
      value: data.hoy.length || 0,
      color: C.verde,
      text: `${data.hoy.length}`,
    },
    {
      value: data.ayer.length || 0,
      color: C.top,
      text: `${data.ayer.length}`,
    },
    {
      value: data.anteayer.length || 0,
      color: C.morado,
      text: `${data.anteayer.length}`,
    },
  ];

  return (
    <ScrollView
      style={style.pantalla}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.frio}
          colors={[C.frio]}
          progressBackgroundColor={C.tarjeta}
        />
      }
    >
      <View>
        <Text style={style.header}>Monitor del sensor</Text>
        <Text style={style.sub}>{total} lecturas registradas</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Promedio" valor={estadistica.temp_promedio} color={C.verde} />
        <Stat label="Mínima" valor={estadistica.temp_minimo} color={C.frio} />
        <Stat label="Máxima" valor={estadistica.temp_maxima} color={C.calor} />
      </View>

      <Tarjeta titulo="Temperatura" subtitulo="Últimas 6 horas (°C)">
        <GraficoArea datos={temperatura} color={C.calor} />
      </Tarjeta>

      <Tarjeta
        titulo="Distancia"
        subtitulo={`Alertas · promedio ${Number(estadistica.dist_promedio).toFixed(1)} cm`}
      >
        <GraficoArea datos={distancia} color={C.verde} />
      </Tarjeta>

      <Tarjeta titulo="Días fríos" subtitulo="Promedio diario (°C)">
        <GraficoArea datos={diasFrios} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Días calurosos" subtitulo="Promedio diario (°C)">
        <GraficoArea datos={diasCalurosos} color={C.calor} />
      </Tarjeta>

      <Tarjeta titulo="Top temperaturas" subtitulo="Valores más altos">
        <GraficoArea datos={top} color={C.morado} />
      </Tarjeta>

      <Tarjeta titulo="Overview" subtitulo="Lecturas por día">
        <View style={style.pieContainer}>
          <PieChart
            data={pieData}
            donut
            radius={90}
            innerRadius={55}
            strokeWidth={3}
            strokeColor={C.tarjeta}
            innerCircleColor={C.tarjeta}
            innerCircleBorderWidth={3}
            innerCircleBorderColor={C.borde}
            showText
            textColor={C.texto}
            textSize={14}
            showValuesAsLabels
            showTextBackground={false}
            centerLabelComponent={() => (
              <View style={{ alignItems: 'center' }}>
                <Text style={style.pieTotal}>{totalLecturasDia}</Text>
                <Text style={style.pieTotalLabel}>Total</Text>
              </View>
            )}
          />

          <View style={style.leyendaContainer}>
            {renderLegend(`Hoy (${data.hoy.length})`, C.verde)}
            {renderLegend(`Ayer (${data.ayer.length})`, C.top)}
            {renderLegend(`Antier (${data.anteayer.length})`, C.morado)}
          </View>
        </View>
      </Tarjeta>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: C.fondo,
  },
  header: {
    color: C.texto,
    fontSize: 13,
  },
  sub: {
    color: C.texto,
    fontSize: 26,
    fontWeight: 'bold',
  },
  fila: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    backgroundColor: C.tarjeta,
    borderRadius: 12,
    borderTopWidth: 3,
    padding: 12,
  },
  statValor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: C.texto,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 16,
  },
  titulo: {
    color: C.texto,
    fontSize: 17,
    fontWeight: 'bold',
  },
  pieContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  pieTotal: {
    color: C.texto,
    fontSize: 28,
    fontWeight: 'bold',
  },
  pieTotalLabel: {
    color: C.suave,
    fontSize: 13,
    marginTop: 2,
  },
  leyendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  leyendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  leyendaColor: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 8,
  },
  leyendaTexto: {
    color: C.texto,
    fontSize: 13,
  },
});
