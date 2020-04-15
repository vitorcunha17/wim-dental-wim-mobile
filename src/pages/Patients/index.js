import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import UserAvatar from 'react-native-user-avatar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Container, StyledSearchBar } from './styles';
import DefaultHeader from '../../components/DefaultHeader';
import PatientsService from '../../services/patients';

export default function Patients({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  async function searchPatients(input) {
    setSearch(input);
    if (search.length < 3) {
      setPatients([]);
      return;
    }

    const response = await PatientsService.searchPatients(input);

    setPatients(response.data);
  }

  return (
    <Container>
      <StyledSearchBar
        placeholder="Digite o nome do paciente"
        onChangeText={text => searchPatients(text)}
        value={search}
      />
      <ScrollView>
        {patients.map((l, i) => {
          if (l.label) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdatePatient', { patientId: l.value });
                }}
              >
                <ListItem
                  key={i}
                  leftAvatar={<UserAvatar name={l.label} size="40" />}
                  title={l.label}
                  bottomDivider
                />
              </TouchableOpacity>
            );
          } else {
            return <View />;
          }
        })}
      </ScrollView>
      <ActionButton
        buttonColor="#ff6517"
        onPress={() => navigation.navigate('CreatePatient')}
      />
    </Container>
  );
}
