import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const {width} = Dimensions.get('window');

interface WeatherData {
  station_sk: string;
  time: string;
  humidity: number;
  pressure: number;
  temperature: number;
  altitude: number;
}

export function HistoryScreen() {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch('http://192.168.105.81:8080/LastRecords');
        const data: WeatherData[] = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0) {
          setError('No data received from the API.');
          setIsLoading(false);
          return;
        }

        // Ordenar datos en orden ascendente según la hora
        const sortedData = data.sort(
          (a, b) =>
            moment(a.time, 'HH:mm:ss').valueOf() -
            moment(b.time, 'HH:mm:ss').valueOf(),
        );

        // Filtrar datos con un intervalo de 5 minutos
        const filteredData = filterDataByInterval(sortedData, 5);

        // Extraer temperatura y etiquetas de tiempo
        const temperatureData = filteredData.map(item => item.temperature);
        const labels = filteredData.map(item =>
          moment(item.time, 'HH:mm:ss').format('HH:mm'),
        );

        setChartData(temperatureData);
        setChartLabels(labels);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(
          'Error fetching data: ' +
            (error instanceof Error ? error.message : String(error)),
        );
        setIsLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  const filterDataByInterval = (
    data: WeatherData[],
    intervalMinutes: number,
  ): WeatherData[] => {
    if (data.length === 0) return [];

    const filteredData: WeatherData[] = [data[0]];
    let lastTimestamp = moment(data[0].time, 'HH:mm:ss');

    for (let i = 1; i < data.length; i++) {
      const currentTimestamp = moment(data[i].time, 'HH:mm:ss');
      const timeDifferenceMinutes = currentTimestamp.diff(
        lastTimestamp,
        'minutes',
      );

      if (timeDifferenceMinutes >= intervalMinutes) {
        filteredData.push(data[i]);
        lastTimestamp = currentTimestamp;
      }
    }
    return filteredData;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Temperatura</Text>
      {chartData.length > 0 ? (
        <LineChart
          data={{
            labels: chartLabels,
            datasets: [{data: chartData}],
          }}
          width={width * 0.9}
          height={220}
          yAxisLabel="°C "
          chartConfig={{
            backgroundColor: '#f5f5f5',
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#ddd',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#0000FF',
            },
          }}
          bezier
          style={{
            marginVertical: 20,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No hay datos para mostrar.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default HistoryScreen;
