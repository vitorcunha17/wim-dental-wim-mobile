import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DefaultHeader from './components/DefaultHeader';

import SignIn from './pages/SignIn';
import Agenda from './pages/Agenda';
import Patients from './pages/Patients';
import Dashboard from './pages/Dashboard';
import CreateSchedule from './pages/CreateSchedule';
import UpdateSchedule from './pages/UpdateSchedules';
import CreatePatient from './pages/CreatePatient';
import UpdatePatient from './pages/UpdatePatient';

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator(
          {
            SignIn,
          },
          {
            initialRouteName: 'SignIn',
          }
        ),
        Logged: createMaterialBottomTabNavigator(
          {
            Dashboard: {
              screen: Dashboard,
              navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name="monitor-dashboard"
                    size={20}
                    color={focused ? '#000' : '#000'}
                  />
                ),
              }),
            },
            Agenda: {
              screen: createStackNavigator({
                Agenda: {
                  screen: Agenda,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Agenda"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },

                UpdateSchedule: {
                  screen: UpdateSchedule,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Atualizar Agendamento"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },

                CreateSchedule: {
                  screen: CreateSchedule,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Criar Agendamento"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },
              }),
              navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name="calendar-week"
                    size={20}
                    color={focused ? '#000' : '#000'}
                  />
                ),
              }),
            },
            Pacientes: {
              screen: createStackNavigator({
                Pacientes: {
                  screen: Patients,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Pacientes"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },

                CreatePatient: {
                  screen: CreatePatient,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Cadastrar Paciente"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },

                UpdatePatient: {
                  screen: UpdatePatient,
                  navigationOptions: ({ navigation }) => {
                    return {
                      header: () => {
                        return (
                          <DefaultHeader
                            title="Atualizar Paciente"
                            navigation={navigation}
                          />
                        );
                      },
                    };
                  },
                },
              }),
              navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color={focused ? '#000' : '#000'}
                  />
                ),
              }),
            },
          },
          {
            headerLayoutPreset: 'center',
            barStyle: { backgroundColor: '#3dc2cf' },
          }
        ),
      },
      {
        initialRouteName: userLogged ? 'Logged' : 'Sign',
      }
    )
  );

export default Routes;
