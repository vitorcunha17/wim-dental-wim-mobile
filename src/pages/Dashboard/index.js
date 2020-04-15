import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Card, Content, CardItem, Text, Body } from 'native-base';
import moment from 'moment';
import { Container } from './styles';
import DefaultHeader from '../../components/DefaultHeader';
import DashboardService from '../../services/dashboard';

export default function Dashboard({ navigation }) {
  const [infoDashboard, setInfoDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getInformations() {
      const response = await DashboardService.getAllInformations();
      setInfoDashboard(response.data);
      setIsLoading(false);
    }

    getInformations();
  }, []);

  return (
    <Container>
      <DefaultHeader title="Dashboard" navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#3dc2cf" />
      ) : (
        <Content>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: '#000' }}>Consultas da Semana</Text>
            </CardItem>
            {infoDashboard.week_schedules.map(item => (
              <ScrollView>
                <CardItem bordered>
                  <Body>
                    <Text>
                      {moment(item.date_start).format('DD/MM/YYYY')}{' '}
                      {moment(item.date_start).format('HH:mm')} - {item.name}
                    </Text>
                  </Body>
                </CardItem>
              </ScrollView>
            ))}
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: '#000' }}>Aniversariantes do Mês</Text>
            </CardItem>
            {infoDashboard.birthdays.map(item => (
              <CardItem bordered>
                <Body>
                  <Text>
                    {moment(item.born_date).format('DD/MM/YYYY')} - {item.name}
                  </Text>
                </Body>
              </CardItem>
            ))}
          </Card>
        </Content>
      )}
    </Container>
  );
}
