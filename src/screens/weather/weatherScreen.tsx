import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import TemperatureWidget from './temperatureWidget';
import {getWeatherData} from '../../api/api';

export function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<any | null>(null); // Initialize with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hora, setHora] = useState(moment().format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHora(moment().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (err) {
        setError('Error fetching weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Pantalla de Clima</Text>
        <View style={styles.dataContainer}>
          <TemperatureWidget temperature={`${weatherData.temperature}°C`} />{' '}
          {/* Added °C */}
          <View style={styles.card}>
            <Text style={styles.label}>Humedad:</Text>
            <Text style={styles.value}>{`${weatherData.humidity}%`}</Text>{' '}
            {/* Added % */}
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Presión:</Text>
            <Text
              style={styles.value}>{`${weatherData.pressure} hPa`}</Text>{' '}
            {/* Added hPa */}
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Altitud:</Text>
            <Text style={styles.value}>{`${weatherData.altitude} m`}</Text>{' '}
            {/* Added m */}
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{hora}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
