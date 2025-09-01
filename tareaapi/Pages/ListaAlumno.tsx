import { View, Text, FlatList, Button, RefreshControl } from 'react-native';
import React from 'react';
import { useAlumnos } from '../Context/AlumnoContext';
import { Alumno } from '../Modelos/Alumno';

export default function ListaAlumno() {
  const { alumnos, estado, error, listar, eliminar } = useAlumnos();

  const renderItem = ({ item }: { item: Alumno }) => (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.nombreAlumno}</Text>
      <Text>Email: {item.emailAlumno}</Text>
      <Text>Cantidad de clases: {item.cantidadClases}</Text>

      <View style={{ marginTop: 8 }}>
        <Button title="Eliminar" onPress={() => eliminar(item.idAlumno)} />
      </View>
    </View>
  );

  if (estado === 'error') {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <View style={{ marginTop: 8 }}>
          <Button title="Reintentar" onPress={listar} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 12 }}>Listado de Alumnos</Text>

      <FlatList
        data={alumnos}
        keyExtractor={(item) => String(item.idAlumno)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ padding: 12 }}>
            {estado === 'loading' ? 'Cargando…' : 'Sin registros'}
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={estado === 'loading'} onRefresh={listar} />
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
