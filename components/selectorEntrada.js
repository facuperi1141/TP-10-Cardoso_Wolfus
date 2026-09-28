// src/components/SelectorEntrada.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export const SelectorEntrada = ({ control, name, rules }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Entrada</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  value === 'general' && styles.optionSelected,
                ]}
                onPress={() => onChange('general')}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === 'general' && styles.optionTextSelected,
                  ]}
                >
                  General
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  value === 'vip' && styles.optionSelected,
                ]}
                onPress={() => onChange('vip')}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === 'vip' && styles.optionTextSelected,
                  ]}
                >
                  VIP
                </Text>
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  optionSelected: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  optionTextSelected: {
    color: '#FFF',
    fontWeight: '700',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 12,
    marginTop: 4,
  },
});