import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text, Card } from 'native-base';
import { Container, ContainerHour, ContainerTextArea, TextArea, InputPatients, ContainerInputPatients, ContainerButtons } from './styles';
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { getSchedulesFromMonth } from '../../store/schedules/actions';
import SchedulesService from '../../services/schedules';
import DialogInput from '../../components/DialogInput';

const { width } = Dimensions.get('window');

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    color: '#000',
    width: width * 0.8,
  },
  inputAndroid: {
    fontSize: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 6,
    color: '#000',
    width: width * 0.85,
  },
});

export default function UpdateSchedule({ navigation }) {
  const schedule = navigation.getParam('schedule');
  const dispatch = useDispatch();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState();
  const [initialHour, setInitialHour] = useState();
  const [finalHour, setFinalHour] = useState();
  const [type, setType] = useState('');
  const [observations, setObservations] = useState('');
  const [reasonForBlocking, setReasonForBlocking] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPatientName(schedule.patient_name);
    setDate(moment(schedule.date_end).format('YYYY-MM-DD'));
    setInitialHour(moment(schedule.date_start).format('HH:mm'));
    setFinalHour(moment(schedule.date_end).format('HH:mm'));
    setType(schedule.tipo);
    setObservations(schedule.observacoes);
    setReasonForBlocking(schedule.motivo_bloqueio);
  }, []);

  function renderIcon() {
    return <AntDesign name="arrowleft" size={27} color="#000" />;
  }

  async function deleteSchedule(reason) {
    setIsLoading(true);
    const response = await SchedulesService.deleteSchedule(schedule.id, reason);

    dispatch(
      getSchedulesFromMonth(
        moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD'),
        schedule.dentist_id
      )
    );

    setIsLoading(false);
    setVisibleDialog(false);
    navigation.navigate('Agenda');
  }

  async function updateSchedule() {
    setIsLoading(true);
    const data = {
      consulta_inicio: `${date} ${initialHour}:00`,
      consulta_termino: `${date} ${finalHour}:00`,
      tipo: type,
      observacoes: observations,
      motivo_bloqueio: reasonForBlocking,
    };

    await SchedulesService.updateSchedule(data, schedule.id);
    setIsLoading(false);

    Toast.show({
      text: 'Agendamento atualizado com sucesso',
      buttonText: 'OK',
      type: 'success',
      position: 'bottom',
    });

    dispatch(
      getSchedulesFromMonth(
        moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD'),
        schedule.dentist_id
      )
    );
    navigation.navigate('Agenda');
  }

  return (
    <Container>
      <Card style={{ padding: 10, marginTop: 30, paddingBottom: 45, backgroundColor: '#f2f2f2' }}>
        <DialogInput
          visible={visibleDialog}
          onCancel={() => setVisibleDialog(false)}
          placeholder="Digite o motivo da exclusão"
          title="Excluir agendamento"
          submitFunction={deleteSchedule}
        />
        {type !== 'bloqueado' && (
          <ContainerInputPatients>
            <InputPatients value={patientName} editable={false} />
          </ContainerInputPatients>
        )}
        <DatePicker
          style={{ width: width * 0.85, marginTop: 10 }}
          mode="date"
          date={date}
          placeholder="Selecione uma data"
          format="YYYY-MM-DD"
          showIcon={false}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          onDateChange={date => setDate(date)}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderBottomWidth: 1,
              borderBottomColor: '#bfbfbf',
              borderWidth: 0,
              color: '#000',
            },
            placeholderText: {
              color: '#ccc',
              fontSize: 16,
            },
          }}
        />
        <ContainerHour style={{ backgroundColor: '#f2f2f2' }}>
          <DatePicker
            style={{ width: width * 0.372, marginTop: 10 }}
            mode="time"
            format="HH:mm"
            date={initialHour}
            placeholder="Início"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => setInitialHour(date)}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#bfbfbf',
                color: '#000',
              },
              placeholderText: {
                color: '#ccc',
                fontSize: 16,
              },
            }}
          />

          <DatePicker
            style={{ width: width * 0.372, marginTop: 10, marginLeft: 40 }}
            mode="time"
            format="HH:mm"
            date={finalHour}
            placeholder="Fim"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => setFinalHour(date)}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#bfbfbf',
                color: '#000',
              },
              placeholderText: {
                color: '#ccc',
                fontSize: 16,
              },
            }}
          />
        </ContainerHour>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
            width: width * 0.85,
            height: 45,
            justifyContent: 'center',
            marginTop: 15,
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            value={type}
            onValueChange={value => setType(value)}
            placeholderTextColor="#ccc"
            placeholder={{ label: 'Selecione o tipo do agendamento', value: '' }}
            items={[
              { label: 'Normal', value: 'normal' },
              { label: 'Retorno', value: 'retorno' },
              { label: 'Orçamento', value: 'orcamento' },
              { label: 'Horário Bloqueado', value: 'bloqueado' },
              { label: 'Cirurgia', value: 'cirurgia' },
              { label: 'Outro', value: 'outro' },
            ]}
          />
        </View>
        {type === 'bloqueado' && (
          <ContainerTextArea>
            <TextArea
              underlineColorAndroid="transparent"
              placeholder="Motivo do bloqueio"
              style={{ fontSize: 16 }}
              value={reasonForBlocking}
              placeholderTextColor="#ccc"
              returnKeyType="done"
              onChangeText={text => setReasonForBlocking(text)}
              numberOfLines={2}
              autoCapitalize="words"
            />
          </ContainerTextArea>
        )}

        <ContainerTextArea>
          <TextArea
            underlineColorAndroid="transparent"
            returnKeyType="done"
            style={{ fontSize: 16 }}
            numberOfLines={2}
            placeholder="Observações"
            value={observations}
            placeholderTextColor="#ccc"
            onChangeText={text => setObservations(text)}
            autoCapitalize="words"
            editable={true}
          />
        </ContainerTextArea>
      </Card>

      <ContainerButtons>
        <Button
          onPress={updateSchedule}
          style={{
            marginTop: 30,
            backgroundColor: '#343a40',
            width: '43%',
            marginRight: 20,
            justifyContent: 'center',
          }}
        >
          {!isLoading ? (
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Salvar</Text>
          ) : (
              <ActivityIndicator color="#fff" />
            )}
        </Button>
        <Button
          onPress={() => setVisibleDialog(true)}
          style={{
            marginTop: 30,
            backgroundColor: '#DC3445',
            width: '43%',
            justifyContent: 'center',
          }}
        >
          {!isLoading ? (
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Excluir</Text>
          ) : (
              <ActivityIndicator color="#fff" />
            )}
        </Button>
      </ContainerButtons>
      <ActionButton
        buttonColor="#eaeaea"
        renderIcon={renderIcon}
        position="left"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Container>
  );
}
