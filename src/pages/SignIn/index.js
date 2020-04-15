import React, { useState } from 'react';
import { TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import {
  Container,
  Box,
  Image,
  InputLogin,
  InputContainer,
  Icon,
  ButtonLogin,
  TextButton,
  TextForgotPassword,
} from './styles';
import Logo from '../../../assets/logo-wim-dental-login.png';
import AuthService from '../../services/auth';
import DialogInput from '../../components/DialogInput';

export default function SignIn({ navigation }) {
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function requestLogin() {
    setLoading(true);
    const response = await AuthService.login(email, password);

    if (response.code === 200) {
      AsyncStorage.setItem('token', response.data);
      const decodedToken = jwtDecode(response.data);
      AsyncStorage.setItem('info_clinic', JSON.stringify(decodedToken));
      navigation.navigate('Dashboard');
    } else if (response.code === 401) {
      Alert.alert(response.message);
    } else {
      Alert.alert('Ocorreu um erro, verifique sua conexão e tente novamente!');
    }
    setLoading(false);
  }

  async function submitForgotPassword(email) {
    const response = await AuthService.forgotPassword(email);

    setVisibleDialog(false);
    if (response.code === 200) {
      setTimeout(() => {
        Alert.alert(
          'Um email com as instruções para a recuperação da senha foi enviado'
        );
      }, 400);
    } else {
      setTimeout(() => {
        Alert.alert(
          'Email não cadastrado ou ocorreu um erro interno, verifique os dados e tente novamente!'
        );
      }, 400);
    }
    setEmail('');
  }

  return (
    <Container
      colors={['#192f6a', '#007eaed9', '#1ac1bbd9']}
      style={{ flex: 1 }}
    >
      <DialogInput
        title="Recuperar senha"
        visible={visibleDialog}
        placeholder="E-mail"
        submitFunction={submitForgotPassword}
        onCancel={() => setVisibleDialog(false)}
      />
      <Box style={{ elevation: 20 }}>
        <Image source={Logo} resizeMode="contain" />
        <InputContainer>
          <InputLogin
            keyboardType="email-address"
            autoCorrect
            autoCapitalize="none"
            placeholder=" Digite seu e-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Icon name="email-outline" size={20} />
        </InputContainer>
        {!visiblePassword ? (
          <InputContainer>
            <InputLogin
              secureTextEntry
              keyboardAppearance="default"
              placeholder=" Digite sua senha"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}
            >
              <Icon name="eye-off" size={23} />
            </TouchableOpacity>
          </InputContainer>
        ) : (
          <InputContainer>
            <InputLogin
              keyboardAppearance="default"
              placeholder=" Digite sua senha"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}
            >
              <Icon name="eye" size={20} />
            </TouchableOpacity>
          </InputContainer>
        )}
        <TouchableOpacity onPress={() => setVisibleDialog(true)}>
          <TextForgotPassword>
            <Icon name="lock" size={15} />
            Esqueceu sua senha?
          </TextForgotPassword>
        </TouchableOpacity>
        <ButtonLogin onPress={requestLogin}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TextButton>Entrar</TextButton>
          )}
        </ButtonLogin>
      </Box>
    </Container>
  );
}
