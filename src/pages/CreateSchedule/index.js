import React, { useState } from 'react';
import { AsyncStorage, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Card, Button, Text, Toast } from 'native-base';
import { Container, ContainerHour, ContainerTextArea, TextArea } from './styles';
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import SelectPatients from '../../components/SelectPatients';
import PatientsService from '../../services/patients';
import { ActivityIndicator } from 'react-native-paper';
import SchedulesService from '../../services/schedules';
import { getSchedulesFromMonth } from '../../store/schedules/actions';

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

export default function CreateSchedule({ navigation }) {
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [selectPatient, setSelectedPatient] = useState({
    name: '',
    value: null,
  });
  const [date, setDate] = useState();
  const [initialHour, setInitialHour] = useState();
  const [finalHour, setFinalHour] = useState();
  const [type, setType] = useState('');
  const [observations, setObservations] = useState('');
  const [reasonForBlocking, setReasonForBlocking] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function searchPatients(input) {
    const response = await PatientsService.searchPatients(input);

    if (Platform.OS === 'android') {
      let patients = response.data;
      patients.forEach((element, index) => {
        element = { name: element.label, value: element.value };
        patients[index] = element;
      });
      setPatients(patients);
    } else {
      setPatients(response.data);
      setSelectedPatient(response.data[0].value);
    }
  }

  function renderIcon() {
    return <AntDesign name="arrowleft" size={27} color="#000" />;
  }

  async function createSchedule() {
    setIsLoading(true);
    const doctor_id = JSON.parse(await AsyncStorage.getItem('info_clinic')).user
      .id;
    const data = {
      consulta_inicio: `${date} ${initialHour}:00`,
      consulta_termino: `${date} ${finalHour}:00`,
      pre_cadastro: false,
      doctor_id,
      tipo: type,
      observacoes: observations,
      motivo_bloqueio: reasonForBlocking,
      selected_patient:
        Platform.OS === 'android' ? selectPatient.value : selectPatient,
    };

    await SchedulesService.createSchedule(data);
    setIsLoading(false);
    Toast.show({
      text: 'Agendamento criado com sucesso',
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
        doctor_id
      )
    );
    navigation.navigate('Agenda');
  }

  return (
    <Container>
      <Card style={{ padding: 10, marginTop: 30, paddingBottom: 45, backgroundColor: '#f2f2f2' }}>
        {type !== 'bloqueado' && (
          <SelectPatients
            items={patients}
            value={selectPatient}
            searchPatients={searchPatients}
            onChangeValue={itemValue => setSelectedPatient(itemValue)}
          />
        )}
        <DatePicker
          style={{ width: width * 0.85, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}
          mode="date"
          date={date}
          placeholder="Selecione uma data"
          format="YYYY-MM-DD"
          showIcon={false}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          onDateChange={date => setDate(date)}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              color: '#000',
            },
            placeholderText: {
              color: '#6b6b6b',
              fontSize: 16,
            },
          }}
        />
        <ContainerHour style={{ backgroundColor: '#f2f2f2' }}>
          <DatePicker
            style={{ width: width * 0.374, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}
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
                color: '#000',
              },
              placeholderText: {
                color: '#6b6b6b',
                fontSize: 16,
              },
            }}
          />

          <DatePicker
            style={{ width: width * 0.374, marginTop: 10, marginLeft: 40, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}
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
                color: '#000',
              },
              placeholderText: {
                color: '#6b6b6b',
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
            justifyContent: 'center',
            height: 45,
            marginTop: 15,
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => setType(value)}
            placeholderTextColor="#6b6b6b"
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
              keyboardType="default"
              returnKeyType="done"
              style={{ fontSize: 16 }}
              value={reasonForBlocking}
              placeholderTextColor="#6b6b6b"
              onChangeText={text => setReasonForBlocking(text)}
            />
          </ContainerTextArea>
        )}

        <ContainerTextArea>
          <TextArea
            underlineColorAndroid="transparent"
            style={{ fontSize: 16 }}
            placeholder="Observações"
            keyboardType="default"
            returnKeyType="done"
            value={observations}
            placeholderTextColor="#6b6b6b"
            onChangeText={text => setObservations(text)}
          />
        </ContainerTextArea>
      </Card>
      <Button
        onPress={createSchedule}
        style={{
          marginTop: 30,
          backgroundColor: '#343a40',
          width: '90%',
          justifyContent: 'center',
        }}
      >
        {!isLoading ? (
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Salvar</Text>
        ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
      </Button>
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
