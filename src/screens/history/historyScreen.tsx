import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Historial</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HistoryScreen;
