import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Alumno } from '../Modelos/Alumno';

type Estado = 'idle' | 'loading' | 'error' | 'success';

type AlumnoContextType = {
  alumnos: Alumno[];
  estado: Estado;
  error: string | null;
  listar: () => Promise<void>;
  agregar: (nuevo: Omit<Alumno, 'idAlumno'>) => Promise<void>;
  eliminar: (idAlumno: number) => Promise<void>;
};

const AlumnoContext = createContext<AlumnoContextType | undefined>(undefined);

const API_BASE = 'http://192.168.0.7:5000';

export const AlumnoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [estado, setEstado] = useState<Estado>('idle');
  const [error, setError] = useState<string | null>(null);

  const listar = useCallback(async () => {
    try {
      setEstado('loading');
      setError(null);
      const resp = await fetch(`${API_BASE}/alumno`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data: Alumno[] = await resp.json();
      setAlumnos(data);
      setEstado('success');
    } catch (e: any) {
      setEstado('error');
      setError(e?.message ?? 'Error listando alumnos');
    }
  }, []);

  const agregar = useCallback(async (nuevo: Omit<Alumno, 'idAlumno'>) => {
    try {
      setEstado('loading');
      setError(null);
      const resp = await fetch(`${API_BASE}/alumno`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevo)
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      await listar();
      setEstado('success');
      Alert.alert('Éxito', 'Alumno agregado.');
    } catch (e: any) {
      setEstado('error');
      setError(e?.message ?? 'Error agregando alumno');
      Alert.alert('Error', e?.message ?? 'Error agregando alumno');
    }
  }, [listar]);

  const eliminar = useCallback(async (idAlumno: number) => {
    try {
      setEstado('loading');
      setError(null);
      const resp = await fetch(`${API_BASE}/alumno/${idAlumno}`, {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      setAlumnos(prev => prev.filter(a => a.idAlumno !== idAlumno));
      setEstado('success');
      Alert.alert('Eliminado', 'Alumno eliminado.');
    } catch (e: any) {
      setEstado('error');
      setError(e?.message ?? 'Error eliminando alumno');
      Alert.alert('Error', e?.message ?? 'Error eliminando alumno');
    }
  }, []);

  useEffect(() => { listar(); }, [listar]);

  const value = useMemo(() => ({ alumnos, estado, error, listar, agregar, eliminar }),
    [alumnos, estado, error, listar, agregar, eliminar]);

  return <AlumnoContext.Provider value={value}>{children}</AlumnoContext.Provider>;
};

export const useAlumnos = () => {
  const ctx = useContext(AlumnoContext);
  if (!ctx) throw new Error('useAlumnos debe usarse dentro de AlumnoProvider');
  return ctx;
};
