import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ModalContainer = styled.View`
  justify-content: center;
`;

export const ButtonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 4px;
`;

export const BorderInput = styled.View`
  margin-top: 50px;
  border: 1px solid #a9a9a9;
  height: 45px;
  border-radius: 6px;
  width: 310px;
  margin-left: 15px;
`;

export const Input = styled.TextInput`
  height: 40px;
  width: 200px;
  margin-left: 10px;
`;

export const FakeInput = styled.View`
  display: flex;
  height: 40px;
  width: ${width * 0.85};
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
`;

export const ButtonOK = styled.Text`
  color: blue;
  margin-top: 50px;
  margin-right: 6px;
  align-self: center;
  font-size: 18px;
`;
