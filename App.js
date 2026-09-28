import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { InscripcionScreen } from './screens/pantallaInscription';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <InscripcionScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});