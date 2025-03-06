import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
const weatherData = {
  date: '2025-03-02',
  time: '10:26:35',
  station_sk: '12345',
  humidity: '85%',
  pressure: '1013 hPa',
  temperature: '20°C',
  altitude: '2150 m',
};
export function SensorScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pantalla de Sensor</Text>
      <View style={styles.target}>
        <Text style={styles.lable}>Stacion N°: {weatherData.station_sk}</Text>
        <Text style={styles.lable}>Fecha: {weatherData.date}</Text>
        <Text style={styles.lable}>{weatherData.time}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  target: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  lable: {
    justifyContent: 'center',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'center',
  },
});

export default SensorScreen;
