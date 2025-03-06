import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {getWeatherLastRecords} from '../../api/api';
import moment from 'moment';

const {width} = Dimensions.get('window');

interface WeatherData {
  station_sk: string;
  time: string; // Changed to 'time'
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
        const data = await getWeatherLastRecords();
        setIsLoading(false);
        if (data && Array.isArray(data)) {
          const filteredData = filterDataByInterval(data, 5); // 5-minute interval
          const temperatureData = filteredData.map(item => item.temperature);
          const labels = filteredData.map(item =>
            moment(item.time, 'HH:mm:ss').format('HH:mm'),
          ); // Parse 'time'
          setChartData(temperatureData);
          setChartLabels(labels);
        } else if (data) {
          setChartData([data.temperature]);
          setChartLabels(['Now']);
        } else {
          setError('No data received from the API.');
        }
      } catch (error) {
        setError(
          'Error fetching data: ' +
            (error instanceof Error ? error.message : String(error)),
        );
      }
    };

    fetchHistoryData();
  }, []);

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
  const filterDataByInterval = (
    data: WeatherData[],
    intervalMinutes: number,
  ): WeatherData[] => {
    if (data.length === 0) return [];

    //This assumes that the data is already sorted by time. If not, uncomment the sort function.
    const sortedData = [...data].sort(
      (a, b) =>
        moment(a.time, 'HH:mm:ss').valueOf() -
        moment(b.time, 'HH:mm:ss').valueOf(),
    );
    // const sortedData = [...data];
    const filteredData: WeatherData[] = [sortedData[0]];
    let lastTimestamp = moment(sortedData[0].time, 'HH:mm:ss');

    for (let i = 1; i < sortedData.length; i++) {
      const currentTimestamp = moment(sortedData[i].time, 'HH:mm:ss');
      const timeDifferenceMinutes = currentTimestamp.diff(
        lastTimestamp,
        'minutes',
      );

      if (timeDifferenceMinutes >= intervalMinutes) {
        filteredData.push(sortedData[i]);
        lastTimestamp = currentTimestamp;
      }
    }
    return filteredData;
  };

  //Since we only have one data point, we don't need multiple labels

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Temperatura</Text>
      {chartData.length > 0 && (
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
      )}
      {chartData.length === 0 && <Text>No data to display.</Text>}
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
