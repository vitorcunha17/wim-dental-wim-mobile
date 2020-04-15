import { AsyncStorage } from 'react-native';

let baseURL = 'https://app.wimdental.com/api/v1/api';

async function getToken() {
  return await AsyncStorage.getItem('token');
}

export async function httpPost(endpoint, body) {
  return await fetch(`${baseURL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Application-Version': '1.3.3',
      Origin: 'https://app.wimdental.com',
      Host: 'app.wimdental.com',
    },
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body),
  });
}

export async function httpGet(endpoint, body) {
  return await fetch(`${baseURL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Application-Version': '1.3.3',
    },
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body),
  });
}

export async function httpPut(endpoint, body) {
  return await fetch(`${baseURL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Application-Version': '1.3.3',
    },
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body),
  });
}

export async function httpDelete(endpoint, body) {
  return await fetch(`${baseURL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Application-Version': '1.3.3',
    },
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body),
  });
}
