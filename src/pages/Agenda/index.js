import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Agenda } from '../../components/Agenda';
import { LocaleConfig } from '../../components/Agenda';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import {
  Container,
  ScheduleContainer,
  ContentItem,
  ColorSchedule,
  colors,
} from './styles';
import SchedulesService from '../../services/schedules';
import { getSchedulesFromMonth } from '../../store/schedules/actions';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje'hj",
};
LocaleConfig.defaultLocale = 'br';

export default function Agendamento({ navigation }) {
  const dispatch = useDispatch();
  const schedules = useSelector(state => state.schedules);
  const [lastMonth, setLastMonth] = useState(moment().format('YYYY-MM-DD'));

  async function updateSchedulesMonth({ dateString }) {
    setLastMonth(moment(dateString).format('YYYY-MM-DD'));
    const infoClinic = JSON.parse(await AsyncStorage.getItem('info_clinic'));
    dispatch(
      getSchedulesFromMonth(
        moment(dateString)
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        moment(dateString)
          .add(30, 'days')
          .format('YYYY-MM-DD'),
        infoClinic.user.id
      )
    );
  }

  async function onRefresh() {
    const infoClinic = JSON.parse(await AsyncStorage.getItem('info_clinic'));
    dispatch(
      getSchedulesFromMonth(
        moment(lastMonth)
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        moment(lastMonth)
          .add(30, 'days')
          .format('YYYY-MM-DD'),
        infoClinic.user.id
      )
    );
  }

  function switchColor(type) {
    switch (type) {
      case 'normal':
        return colors.normal;
      case 'retorno':
        return colors.retorno;
      case 'bloqueado':
        return colors.horarioBloqueado;
      case 'cirurgia':
        return colors.cirurgia;
      case 'cancelado':
        return colors.cancelado;
      case 'finalizado':
        return colors.finalizado;
      case 'orcamento':
        return colors.orcamento;
      case 'Primeira Consulta':
        return colors.primeiraConsulta;
      default:
        return colors.outro;
    }
  }

  function renderItem(item) {
    return (
      <ScheduleContainer
        onPress={() =>
          navigation.navigate('UpdateSchedule', {
            schedule: { ...item },
            updateSchedulesMonth,
          })
        }
      >
        <ColorSchedule
          style={{
            backgroundColor: switchColor(item.tipo),
          }}
        />
        <ContentItem>
          <Text>Paciente: {item.patient_name}</Text>
          <Text>
            Horário: &nbsp;
            {moment(item.date_start).format('HH:mm')} até{' '}
            {moment(item.date_end).format('HH:mm')}
          </Text>
        </ContentItem>
      </ScheduleContainer>
    );
  }

  function renderEmptyDate() {
    return <View />;
  }

  function rowHasChanged(r1, r2) {
    return r1.date_start !== r2.date_start;
  }

  return (
    <Container>
      <Agenda
        items={schedules.schedules}
        loadItemsForMonth={updateSchedulesMonth}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        refreshing={false}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onRefresh={onRefresh}
      />
      <ActionButton
        buttonColor="#ff6517"
        onPress={() => {
          navigation.push('CreateSchedule', { updateSchedulesMonth });
        }}
      />
    </Container>
  );
}
