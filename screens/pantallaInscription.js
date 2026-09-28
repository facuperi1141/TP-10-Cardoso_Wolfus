
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CampoFormulario from '../components/campoForm';
import { SelectorEntrada } from '../components/selectorEntrada';
import TicketConfirmacion from '../components/ticketConfirmacion';

const ASYNC_STORAGE_KEY = '@sonido_sur_last_email';

export const InscripcionScreen = () => {
  const [datosTicket, setDatosTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
  });

  // BONUS 1: Carga diferida del email previo guardado
  useEffect(() => {
    const cargarEmailGuardado = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (savedEmail) {
          setValue('email', savedEmail, { shouldValidate: true });
        }
      } catch (e) {
        console.error('Error al cargar email', e);
      }
    };
    cargarEmailGuardado();
  }, [setValue]);

  // Handler de envío con simulación de servidor (Bonus 2)
  const onSubmit = async (data) => {
    setLoading(true);

    // Guardar último email en AsyncStorage
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, data.email);
    } catch (e) {
      console.error('Error al guardar email', e);
    }

    // Simulación de delay de red de 1 segundo
    setTimeout(() => {
      setLoading(false);
      setDatosTicket(data);
    }, 1000);
  };

  const handleReset = () => {
    setDatosTicket(null);
    reset({
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerTitle}>Sonido Sur Festival</Text>
        <Text style={styles.headerSubtitle}>Formulario de Inscripción</Text>

        {!datosTicket ? (
          <View style={styles.formCard}>
            {/* Campo 1: Nombre Completo */}
            <CampoFormulario
              control={control}
              name="nombreCompleto"
              label="Nombre Completo"
              placeholder="Ej. Ana Pérez"
              rules={{
                required: 'Ingresá tu nombre completo',
                validate: (val) =>
                  val.trim().length >= 3 || 'Ingresá tu nombre completo',
              }}
            />

            {/* Campo 2: Email */}
            <CampoFormulario
              control={control}
              name="email"
              label="Email"
              placeholder="ejemplo@correo.com"
              keyboardType="email-address"
              rules={{
                required: 'Ingresá un email válido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingresá un email válido',
                },
              }}
            />

            {/* Campo 3: Edad */}
            <CampoFormulario
              control={control}
              name="edad"
              label="Edad"
              placeholder="Ej. 25"
              keyboardType="numeric"
              rules={{
                required: 'La edad tiene que ser mayor a 12',
                validate: (val) => {
                  const num = parseInt(val, 10);
                  if (isNaN(num) || num < 12 || num > 99) {
                    return 'La edad tiene que ser mayor a 12';
                  }
                  return true;
                },
              }}
            />

            {/* Campo 4: Tipo de Entrada */}
            <SelectorEntrada
              control={control}
              name="tipoEntrada"
              rules={{
                required: 'Elegí un tipo de entrada',
              }}
            />

            {/* Campo 5: Teléfono */}
            <CampoFormulario
              control={control}
              name="telefono"
              label="Teléfono (Opcional)"
              placeholder="Ej. 1122334455"
              keyboardType="phone-pad"
              rules={{
                validate: (val) => {
                  if (!val) return true;
                  const soloNumeros = /^[0-9]+$/;
                  return soloNumeros.test(val) || 'Solo se permiten números';
                },
              }}
            />

            {/* Botón de Enviar */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isValid || loading) && styles.submitButtonDisabled,
              ]}
              disabled={!isValid || loading}
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>Confirmar inscripción</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TicketConfirmacion datos={datosTicket} onVolver={handleReset} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});