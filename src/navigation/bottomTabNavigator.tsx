import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sun, Compass, BarChart2} from 'react-native-feather';
import WeatherScreen from '../screens/weather/weatherScreen';
//import SensorScreen from '../screens/sensor/sensorScreen';
import HistoryScreen from '../screens/history/historyScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icons: {[key: string]: React.ElementType} = {
            Clima: Sun,
            Sensor: Compass,
            Historial: BarChart2,
          };

          const IconComponent = icons[route.name] || Sun; // Asegurar un icono por defecto

          return <IconComponent stroke={color} width={size} height={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Clima" component={WeatherScreen} />

      <Tab.Screen name="Historial" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
