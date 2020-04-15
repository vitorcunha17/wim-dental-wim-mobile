import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const ScheduleContainer = styled.TouchableOpacity`
  background: #fff;
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  margin-top: 17px;
  height: 50px;
`;

export const ContentItem = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
`;

export const ColorSchedule = styled.View`
  display: flex;
  align-self: baseline;
  height: 40;
  width: 5;
  margin-right: 10;
`;

export const colors = {
  retorno: '#68C6BA',
  normal: '#008773',
  primeiraConsulta: '#FF7F15',
  horarioBloqueado: '#ED6253',
  orcamento: '#F2C975',
  cirurgia: '#1C3341',
  finalizado: '#6BB983',
  cancelado: '#333935',
  outro: '#024059',
};
