import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #fff;
  flex-direction: column;
  align-items: center;
`;

export const ContainerInputPatients = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${width * 0.85};
  height: 40px;
  margin-top: 20px;
`;

export const InputPatients = styled.TextInput`
  align-self: center;
  align-items: center;
  text-align: center;
  width: ${width * 0.8};
  height: 35px;
  font-size: 16px;
`;

export const ContainerHour = styled.View`
  display: flex;
  background: #fff;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ContainerTextArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${width * 0.85};
  height: 45px;
  margin-top: 20px;
`;

export const TextArea = styled.TextInput`
  align-self: center;
  width: ${width * 0.8};
  height: 40px;
`;

export const ContainerButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
