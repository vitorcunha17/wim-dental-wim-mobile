import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import { View, Alert } from 'react-native';

export default function DialogForgotPassword({
  title,
  visible,
  placeholder,
  onCancel,
  submitFunction,
}) {
  const [argument, setArgument] = useState('');
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Input
          placeholder={placeholder}
          onChangeText={text => setArgument(text)}
        />
        <Dialog.Button onPress={onCancel} label="Cancelar" />
        <Dialog.Button
          onPress={() => submitFunction(argument)}
          label="Confirmar"
        />
      </Dialog.Container>
    </View>
  );
}
