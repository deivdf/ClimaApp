import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface TemperatureWidgetProps {
  temperature: string;
}

const getWeatherImage = (temperature: string) => {
  const temp = parseFloat(temperature);
  if (temp >= 30) {
    return { uri: 'sunny' }; // Clima caluroso
  } else if (temp >= 20) {
    return { uri: 'cloudy' }; // Clima templado
  } else if (temp >= 10) {
    return { uri: 'rainy' }; // Clima frío con lluvia
  } else {
    return { uri: 'stormy' }; // Clima muy frío o tormenta
  }
};

export function TemperatureWidget({ temperature }: TemperatureWidgetProps) {
  return (
    <ImageBackground source={getWeatherImage(temperature)} style={styles.card} imageStyle={{ borderRadius: 10 }}>
      <View style={styles.overlay}>
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{temperature}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: 150, // Asegurar que la altura sea suficiente
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Oscurecer un poco la imagen para mejorar visibilidad
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default TemperatureWidget;