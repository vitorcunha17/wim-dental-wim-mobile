import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #fff;
  flex-direction: column;
  align-items: center;
`;

export const ContainerHour = styled.View`
  display: flex;
  background: #fff;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ContainerTextArea = styled.View`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  align-items: center;
  justify-content: center;
  width: ${width * 0.85};
  height: 50px;
  margin-top: 20px;
`;

export const TextArea = styled.TextInput`
  align-self: center;
  width: ${width * 0.8};
  height: 45px;
`;
