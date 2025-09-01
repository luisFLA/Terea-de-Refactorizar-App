import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import ListaAlumno from '../Pages/ListaAlumno';
import AgregarAlumnos from '../Pages/AgregarAlumnos';

export default function Navegacion() {

    const tab= createBottomTabNavigator();
  return (
    
    <NavigationContainer>
        <tab.Navigator>
            <tab.Screen name='Lista Alumnos' component={ListaAlumno}></tab.Screen>
            <tab.Screen name='Agregar Alumnos' component={AgregarAlumnos}></tab.Screen>
        </tab.Navigator>
    </NavigationContainer>
   
  )
}