import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
background-color: #fff;
  flex: 1;
  align-items: center;
  flex-direction: column;
`;

export const Row = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerInput = styled.View`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: ${width * 0.85};
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
`;

export const Input = styled.TextInput`
  color: #000;
  font-size: 16px;
  height: 45px;
  width: ${width * 0.8};

  ::placeholder {
    color: #ccc;
    font-size: 16px;
  }
`;

export const Divider = styled.View`
  height: 1px;
  background: #a9a9a9;
  width: 100%;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;
