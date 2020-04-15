import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  StatusBar,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Header, Body, Title } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../../../assets/ico-wim.png';
import { ContainerImage } from './styles';

export default function DefaultHeader({ title, navigation }) {
  const { height } = Dimensions.get('window');
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <Header
          style={{
            backgroundColor: '#3dc2cf',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <StatusBar barStyle="dark-content" />
          <ContainerImage>
            <Title>
              <Image
                source={Logo}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
                resizeMode="contain"
              />
            </Title>
            <Title style={{ marginTop: 2 }}>{title}</Title>
          </ContainerImage>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Sign');
            }}
          >
            <Title style={{ marginTop: 14 }}>
              Sair &nbsp;
              <FontAwesome name="sign-out" size={16} />
            </Title>
          </TouchableOpacity>
        </Header>
      ) : (
        <Header
          style={{
            height: height * 0.1,
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#3dc2cf',
          }}
        >
          <StatusBar barStyle="dark-content" />
          <ContainerImage>
            <Image
              source={Logo}
              style={{
                marginTop: 17,
                width: 30,
                height: 30,
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
            <Title style={{ marginLeft: 5, marginTop: 18, color: '#000' }}>
              {title}
            </Title>
          </ContainerImage>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Sign');
            }}
          >
            <Title style={{ marginTop: 32, color: '#000' }}>
              Sair &nbsp;
              <FontAwesome name="sign-out" size={16} />
            </Title>
          </TouchableOpacity>
        </Header>
      )}
    </View>
  );
}
