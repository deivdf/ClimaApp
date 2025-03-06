import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const historyData = [
  { "station_sk": "", "humidity": 82, "pressure": 798.57, "temperature": 24.87, "altitude": 1963.67 },
  { "station_sk": "", "humidity": 82, "pressure": 798.56, "temperature": 25.01, "altitude": 1963.84 },
  { "station_sk": "", "humidity": 82, "pressure": 798.61, "temperature": 24.87, "altitude": 1963.29 },
  { "station_sk": "", "humidity": 82, "pressure": 798.69, "temperature": 24.95, "altitude": 1962.52 }
];

const temperatureData = historyData.map((item) => item.temperature);
const labels = historyData.map((_, index) => (index + 1).toString());

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Temperatura</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{
            data: temperatureData,
          }],
        }}
        width={width * 0.9}
        height={220}
        yAxisLabel="°C "
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#ddd",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#0000FF",
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
      />
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
});

export default HistoryScreen;
