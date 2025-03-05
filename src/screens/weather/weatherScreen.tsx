import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TemperatureWidget from './TemperatureWidget';

// Datos de prueba
const weatherData = {
  date: "2025-03-02",
  time: "10:26:35",
  station_sk: "12345",
  humidity: "85%",
  pressure: "1013 hPa",
  temperature: "30°C",
  altitude: "2150 m"
};

export function WeatherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Clima</Text>
      <TemperatureWidget temperature={weatherData.temperature} />
      <View style={styles.card}>
        <Text style={styles.label}>Humedad:</Text>
        <Text style={styles.value}>{weatherData.humidity}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Presión:</Text>
        <Text style={styles.value}>{weatherData.pressure}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Altitud:</Text>
        <Text style={styles.value}>{weatherData.altitude}</Text>
      </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});

export default WeatherScreen;
