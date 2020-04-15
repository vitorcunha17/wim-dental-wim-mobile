import React, { Component, useState } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  View,
  Picker,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  FakeInput,
  Container,
  Input,
  BorderInput,
  ButtonOK,
  ModalContainer,
  ButtonContainer,
} from './styles';
import SearchableDropdown from 'react-native-searchable-dropdown';

const { width } = Dimensions.get('window');

export default function FormPicker(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchString, setSearchString] = useState('');

  if (Platform.OS === 'android') {
    return (
      <SearchableDropdown
        onItemSelect={item => {
          setSearchString(item.name);
          props.onChangeValue(item);
        }}
        defaultIndex={props.selectedPatient}
        onRemoveItem={(item, index) => {
          const items = selectedItems.filter(sitem => sitem.id !== item.id);
          setSelectedItems(items);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#fff',
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={props.items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'placeholder',
          underlineColorAndroid: 'transparent',
          placeholder: 'Digite o nome do paciente',
          placeholderTextColor: '#6b6b6b',
          style: {
            padding: 10,
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
            width: width * 0.85,
            textAlign: 'center',
          },
          defaultValue: props.defaultValue,
          onTextChange: text => {
            props.searchPatients(text);
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    );
  } else {
    const selectedItem = props.items.find(i => i.value === props.value);
    return (
      <Container>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FakeInput>
            {selectedItem ? (
              <Text>{selectedItem.label}</Text>
            ) : (
              <Text style={{ color: '#6b6b6b', fontSize: 16 }}>
                {' '}
                Selecione um paciente{' '}
              </Text>
            )}
          </FakeInput>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={modalVisible}
          presentationStyle="fullScreen"
        >
          <ModalContainer>
            <ButtonContainer>
              <BorderInput>
                <Input
                  placeholder="Digite o nome do paciente"
                  onChangeText={searchString => {
                    props.searchPatients(searchString);
                  }}
                />
              </BorderInput>
              <ButtonOK onPress={() => setModalVisible(false)}>OK</ButtonOK>
            </ButtonContainer>
            <View>
              <Picker
                selectedValue={props.value}
                onValueChange={props.onChangeValue}
              >
                {props.items.map((i, index) => (
                  <Picker.Item key={index} label={i.label} value={i.value} />
                ))}
              </Picker>
            </View>
          </ModalContainer>
        </Modal>
      </Container>
    );
  }
}
