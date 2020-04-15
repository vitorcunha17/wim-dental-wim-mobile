import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text, Toast, Card } from 'native-base';
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Container, ContainerInput, Input, Row, Divider } from './styles';
import PatientsService from '../../services/patients';
import { useEffect } from 'react';

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
    height: 40,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 6,
    color: '#000',
    width: width * 0.85,
  },
});

export default function CreatePatient({ navigation }) {
  const [infoPatient, setInfoPatient] = useState({});
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const response = await PatientsService.showPatient(
        navigation.getParam('patientId')
      );

      const getAlerts = await PatientsService.getAllAlerts(
        navigation.getParam('patientId')
      );

      if (response) {
        setInfoPatient(response.data);
        setName(response.data.name);
        setGender(response.data.gender);
        setBornDate(response.data.born_date);
        setEmail(response.data.email);
        setMobilePhone(response.data.mobile_phone);
        setAlerts(getAlerts.data);
      }
    }

    getPatient();
  }, []);

  async function updatePatient() {
    if (name.length <= 4) {
      Toast.show({
        text: 'É obrigatório um nome com mais de 4 dígitos!',
        type: 'warning',
        buttonText: 'OK',
      });
      return;
    }
    if (gender === '') {
      Toast.show({
        text: 'É obrigatório preencher o gênero!',
        type: 'warning',
        buttonText: 'OK',
      });
      return;
    }

    if (bornDate === '') {
      Toast.show({
        text: 'É obrigatório preencher a data de nascimento!',
        type: 'warning',
        buttonText: 'OK',
      });
      return;
    }

    const data = {
      name,
      gender,
      born_date: bornDate,
      email,
      mobile_phone: mobilePhone,
      alerts,
    };

    const response = await PatientsService.updatePatient(data, infoPatient.id);

    if (response) {
      Toast.show({
        text: 'Paciente atualizado com sucesso!',
        type: 'success',
        buttonText: 'OK',
      });

      navigation.navigate('Pacientes');
    } else {
      Toast.show({
        text: 'Ocorreu um erro, verifique sua conexão ou tente novamente!',
        type: 'danger',
        buttonText: 'OK',
      });
    }
  }

  function addAlert() {
    setAlerts([...alerts, { type_alert: '', message: '' }]);
  }

  function removeAlert(index) {
    if (alerts.length === 1) {
      setAlerts([]);
      return;
    }
    let newAlerts = alerts;
    newAlerts = alerts.slice(1, index);
    setAlerts(newAlerts);
  }

  function renderIcon() {
    return <AntDesign name="arrowleft" size={27} color="#000" />;
  }

  return (
    <Container>
      <Card style={{ padding: 10, marginTop: 30, paddingBottom: 45, backgroundColor: '#f2f2f2' }}>
        <ContainerInput>
          <Input
            placeholder="Nome do paciente"
            value={name}
            onChangeText={text => setName(text)}
            keyboardType="default"
            returnKeyType="done"
          />
        </ContainerInput>
        <View
          style={{
            width: width * 0.85,
            height: 40,
            justifyContent: 'center',
            marginTop: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => setGender(value)}
            value={gender}
            placeholderTextColor="#ccc"
            placeholder={{ label: 'Selecione o sexo', value: '' }}
            items={[
              { label: 'Masculino', value: 'm' },
              { label: 'Feminino', value: 'f' },
            ]}
          />
        </View>

        <DatePicker
          style={{ width: width * 0.85, marginTop: 20 }}
          mode="date"
          date={bornDate}
          placeholder="Aniversário"
          format="YYYY-MM-DD"
          showIcon={false}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          onDateChange={date => setBornDate(date)}
          customStyles={{
            dateInput: {
              borderBottomWidth: 1,
              borderWidth: 0,
              borderBottomColor: '#bfbfbf',
              color: '#000',
              alignItems: 'flex-start',
            },
            placeholderText: {
              color: '#ccc',
              fontSize: 16,
              marginLeft: 5,
            },
          }}
        />
        <ContainerInput>
          <Input
            placeholder="E-mail"
            value={email}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            returnKeyType="done"
          />
        </ContainerInput>
        <ContainerInput>
          <Input
            placeholder="Celular"
            value={mobilePhone}
            keyboardType="numeric"
            onChangeText={text => setMobilePhone(text)}
            returnKeyType="done"
          />
        </ContainerInput>
      </Card>
      {/*<Divider />
      <H2 style={{ marginTop: 5 }}> Alertas </H2>
      <View
        style={{
          height: 130,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
      >
        <ScrollView>
          {alerts.map((alert, index) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Picker
                mode="dialog"
                headerBackButtonText="Voltar"
                iosHeader="Prioridade"
                selectedValue={alert.type_alert}
                onValueChange={value => {
                  let newAlerts = alerts;
                  newAlerts[index].type_alert = value;
                  console.log(newAlerts);
                  setAlerts(newAlerts);
                }}
                placeholder="Nível"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{ color: '#000' }}
                placeholderStyle={{ color: '#ccc', fontSize: 16 }}
                itemTextStyle={{ color: '#0C84FF' }}
                style={{
                  width: width * 0.4,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#a9a9a9',
                  marginRight: 10,
                  marginTop: 5,
                }}
              >
                <Picker.Item label="Atenção" value="attention" />
                <Picker.Item label="Grave" value="serious" />
                <Picker.Item label="Informativo" value="info" />
              </Picker>
              <ContainerInput style={{ width: width * 0.45, marginTop: 5 }}>
                <Input
                  style={{ width: width * 0.4 }}
                  value={alert.message}
                  onChangeText={text => {
                    let newAlerts = alerts;
                    newAlerts[index].message = text;
                    setAlerts(newAlerts);
                  }}
                  placeholder="Descrição"
                  numberOfLines={2}
                />
              </ContainerInput>
              <TouchableOpacity onPress={removeAlert}>
                <AntDesign
                  name="closecircle"
                  size={26}
                  style={{ marginLeft: 10, color: '#ae0000' }}
                />
              </TouchableOpacity>
            </View>
                ))}
          <Button
            small
            onPress={addAlert}
            style={{
              backgroundColor: '#3dc2cf',
              marginTop: 25,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {' '}
              Adicionar Alerta{' '}
            </Text>
          </Button>
        </ScrollView>
      </View>
      <Divider />*/}
      <Button
        onPress={updatePatient}
        style={{ 
          marginTop: 30,
          backgroundColor: '#343a40',
          width: '90%',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Salvar </Text>
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
