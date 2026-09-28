import { StatusBar } from 'expo-status-bar';
import InscripcionScreen from './screens/pantallaInscripcion';

export default function App() {
  return (
    <>
      <InscripcionScreen />
      <StatusBar style="auto" />
    </>
  );
}