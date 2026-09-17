import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CampoFormulario from './campoForm';
import TicketConfirmacion from './ticketConfirmacion';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = '@sonido_sur:ultimo_email';

export default function InscripcionScreen() {
  const [enviado, setEnviado] = useState(false);
  const [datosConfirmados, setDatosConfirmados] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
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

  const tipoEntrada = watch('tipoEntrada');

  // Bonus: precargar el último email inscripto guardado en AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const ultimoEmail = await AsyncStorage.getItem(STORAGE_KEY);
        if (ultimoEmail) {
          setValue('email', ultimoEmail, { shouldValidate: true });
        }
      } catch (e) {
        // si falla el storage, simplemente arrancamos con el form vacío
      }
    })();
  }, [setValue]);

  const onSubmit = async (data) => {
    setEnviando(true);

    // Bonus: pequeño loading simulando el envío a un servidor
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await AsyncStorage.setItem(STORAGE_KEY, data.email);
    } catch (e) {
      // no bloqueamos el flujo si falla el storage
    }

    setDatosConfirmados(data);
    setEnviando(false);
    setEnviado(true);
  };

  const handleVolver = () => {
    reset({
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    });
    setDatosConfirmados(null);
    setEnviado(false);
  };

  if (enviado && datosConfirmados) {
    return (
      <View style={styles.safe}>
        <TicketConfirmacion datos={datosConfirmados} onVolver={handleVolver} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Sonido Sur 🎶</Text>
        <Text style={styles.subtitulo}>Formulario de inscripción al festival</Text>

        <CampoFormulario
          control={control}
          name="nombreCompleto"
          label="Nombre completo"
          placeholder="Ej: Juana Pérez"
          autoCapitalize="words"
          error={errors.nombreCompleto?.message}
          rules={{
            required: 'Ingresá tu nombre completo',
            validate: (value) =>
              value.trim().length >= 3 || 'Ingresá tu nombre completo',
          }}
        />

        <CampoFormulario
          control={control}
          name="email"
          label="Email"
          placeholder="Ej: juana@mail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email?.message}
          rules={{
            required: 'Ingresá un email válido',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Ingresá un email válido',
            },
          }}
        />

        <CampoFormulario
          control={control}
          name="edad"
          label="Edad"
          placeholder="Ej: 24"
          keyboardType="numeric"
          error={errors.edad?.message}
          rules={{
            required: 'La edad tiene que ser mayor a 12',
            validate: (value) => {
              const numero = Number(value);
              if (!value || Number.isNaN(numero)) {
                return 'La edad tiene que ser mayor a 12';
              }
              if (numero < 12 || numero > 99) {
                return 'La edad tiene que ser mayor a 12';
              }
              return true;
            },
          }}
        />

        <View style={styles.wrapper}>
          <Text style={styles.label}>Tipo de entrada</Text>
          <View style={styles.opcionesFila}>
            <Pressable
              style={[
                styles.opcionBoton,
                tipoEntrada === 'general' && styles.opcionBotonActivo,
              ]}
              onPress={() =>
                setValue('tipoEntrada', 'general', { shouldValidate: true })
              }
            >
              <Text
                style={[
                  styles.opcionTexto,
                  tipoEntrada === 'general' && styles.opcionTextoActivo,
                ]}
              >
                🎫 General
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.opcionBoton,
                tipoEntrada === 'vip' && styles.opcionBotonActivo,
              ]}
              onPress={() =>
                setValue('tipoEntrada', 'vip', { shouldValidate: true })
              }
            >
              <Text
                style={[
                  styles.opcionTexto,
                  tipoEntrada === 'vip' && styles.opcionTextoActivo,
                ]}
              >
                ⭐ VIP
              </Text>
            </Pressable>
          </View>
          {/* Input oculto registrado para que react-hook-form valide tipoEntrada */}
          <CampoFormulario
            control={control}
            name="tipoEntrada"
            error={errors.tipoEntrada?.message}
            style={{ display: 'none', height: 0 }}
            rules={{ required: 'Elegí un tipo de entrada' }}
          />
        </View>

        <CampoFormulario
          control={control}
          name="telefono"
          label="Teléfono (opcional)"
          placeholder="Ej: 1122334455"
          keyboardType="phone-pad"
          error={errors.telefono?.message}
          rules={{
            validate: (value) =>
              !value || /^[0-9]+$/.test(value) || 'Solo se permiten números',
          }}
        />

        <Pressable
          style={[
            styles.botonConfirmar,
            (!isValid || enviando) && styles.botonDeshabilitado,
          ]}
          disabled={!isValid || enviando}
          onPress={handleSubmit(onSubmit)}
        >
          {enviando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botonConfirmarTexto}>Confirmar inscripción</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scroll: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2933',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7684',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1F2933',
  },
  opcionesFila: {
    flexDirection: 'row',
    gap: 12,
  },
  opcionBoton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD2D9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  opcionBotonActivo: {
    borderColor: '#3B82F6',
    backgroundColor: '#EAF2FF',
  },
  opcionTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2933',
  },
  opcionTextoActivo: {
    color: '#3B82F6',
  },
  botonConfirmar: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: '#A9C6F5',
  },
  botonConfirmarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});