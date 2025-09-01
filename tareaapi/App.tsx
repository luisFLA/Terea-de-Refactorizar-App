import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navegacion from './Componentes/Navegacion';
import { AlumnoProvider } from './Context/AlumnoContext'; 👈 import del Context

export default function App() {
  return (
    <AlumnoProvider>
      <Navegacion />
      <StatusBar style="auto" />
    </AlumnoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
