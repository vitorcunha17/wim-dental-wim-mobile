import { Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let { height, width } = Dimensions.get('window');

export const Container = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.View`
  align-items: center;
  flex-direction: column;
  width: ${width * 0.8};
  height: ${height * 0.57};
  background: #fff;
  border-radius: 10px;
`;

export const Image = styled.Image`
  height: ${height * 0.15};
  width: ${width * 0.75};
`;

export const InputContainer = styled.View`
  width: ${width * 0.7};
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  border: 1px solid #999999;
  border-radius: 10px;
  height: ${height * 0.08};
  flex-direction: row;
`;

export const InputLogin = styled(TextInput)`
  padding-left: 6px;
  height: ${height * 0.07};
  width: ${width * 0.6};
  border-radius: 5px;
  justify-content: center;
  font-family: Roboto;
  font-size: 18px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  padding-right: 10px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #007eaed9;
  width: ${width * 0.4};
  height: ${height * 0.065};
`;

export const TextButton = styled.Text`
  font-family: Roboto;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

export const TextForgotPassword = styled.Text`
  margin-top: 10px;
  color: #111111;
  font-size: 14px;
`;
