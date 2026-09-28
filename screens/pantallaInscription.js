import { useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export default function InscripcionScreen() {

  const { control } = useForm({
    defaultValues: {
      nombreCompleto: "",
    },
  });

  return (
    <View>
      <Text>Nombre completo</Text>
      <Controller
  control={control}
  name="nombreCompleto"
    rules={{
    required: "Ingresá tu nombre completo",
    minLength: {
      value: 3,
      message: "Ingresá tu nombre completo"
    }
  }}
 render={({ field: { value, onChange }, fieldState: { error } }) => (
    <TextInput
      value={value}
      onChangeText={onChange}
    />
  )}
/>
    </View>
  );
}