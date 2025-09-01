import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAlumnos } from '../Context/AlumnoContext';

export default function AgregarAlumnos() {
  const { agregar } = useAlumnos();

  const [nombreAlumno, setNombreAlumno] = useState('');
  const [emailAlumno, setEmailAlumno] = useState('');
  const [cantidadClase, setCantidadClase] = useState('');

  async function onSubmit() {
    if (!nombreAlumno || !emailAlumno || !cantidadClase) {
      Alert.alert('Faltan datos', 'Completa todos los campos.');
      return;
    }

    await agregar({
      nombreAlumno,
      emailAlumno,
      cantidadClases: Number(cantidadClase),
    } as any);

    setNombreAlumno('');
    setEmailAlumno('');
    setCantidadClase('');
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        Agregar Alumno
      </Text>

      <TextInput
        placeholder="Nombre de Alumno"
        value={nombreAlumno}
        onChangeText={setNombreAlumno}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <TextInput
        placeholder="Email de Alumno"
        value={emailAlumno}
        onChangeText={setEmailAlumno}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <TextInput
        placeholder="Cantidad de clases"
        value={cantidadClase}
        onChangeText={setCantidadClase}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Button title="Agregar Alumno" onPress={onSubmit} />
    </View>
  );
}
