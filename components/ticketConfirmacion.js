import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/**
 * Ticket de confirmación de inscripción.
 * Recibe TODOS los datos por props (no guarda estado propio),
 * tal como pide la consigna (lifting state up en InscripcionScreen).
 *
 * Props:
 * - datos: { nombreCompleto, email, edad, tipoEntrada, telefono }
 * - onVolver: callback para "Volver a inscribir a otra persona"
 */
export default function TicketConfirmacion({ datos, onVolver }) {
  const { nombreCompleto, email, edad, tipoEntrada, telefono } = datos;

  const esVip = tipoEntrada === 'vip';

  return (
    <View style={styles.container}>
      <View style={[styles.ticket, esVip && styles.ticketVip]}>
        <Text style={styles.festival}>🎶 Sonido Sur</Text>
        <Text style={styles.subtitulo}>¡Inscripción confirmada!</Text>

        <View style={styles.divisor} />

        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Nombre</Text>
          <Text style={styles.valor}>{nombreCompleto}</Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Email</Text>
          <Text style={styles.valor}>{email}</Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Edad</Text>
          <Text style={styles.valor}>{edad}</Text>
        </View>

        {telefono ? (
          <View style={styles.fila}>
            <Text style={styles.etiqueta}>Teléfono</Text>
            <Text style={styles.valor}>{telefono}</Text>
          </View>
        ) : null}

        <View style={styles.divisor} />

        <View style={[styles.badge, esVip ? styles.badgeVip : styles.badgeGeneral]}>
          <Text style={styles.badgeTexto}>
            {esVip ? '⭐ ENTRADA VIP' : '🎫 ENTRADA GENERAL'}
          </Text>
        </View>

        <View style={styles.perforado} />

        <Text style={styles.footer}>Presentá este ticket en la entrada</Text>
      </View>

      <Pressable style={styles.boton} onPress={onVolver}>
        <Text style={styles.botonTexto}>Volver a inscribir a otra persona</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  ticket: {
    backgroundColor: '#1F2933',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#323F4B',
  },
  ticketVip: {
    borderColor: '#F0B429',
  },
  festival: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#9AA5B1',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  divisor: {
    borderBottomWidth: 1,
    borderColor: '#323F4B',
    borderStyle: 'dashed',
    marginVertical: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  etiqueta: {
    color: '#9AA5B1',
    fontSize: 14,
  },
  valor: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  badge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 4,
  },
  badgeGeneral: {
    backgroundColor: '#3B82F6',
  },
  badgeVip: {
    backgroundColor: '#F0B429',
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  perforado: {
    height: 1,
    marginTop: 16,
  },
  footer: {
    color: '#6B7684',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  boton: {
    marginTop: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});