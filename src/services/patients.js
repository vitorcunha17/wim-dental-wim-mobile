import { httpPost, httpGet, httpPut } from '../config/api';

class PatientsService {
  async searchPatients(input) {
    try {
      const response = await httpGet(`patients_search?q=${input}`);

      return response.json();
    } catch (err) {
      console.log(err);
      return {
        data: [],
      };
    }
  }

  async createPatient(data) {
    try {
      const response = await httpPost('patients', data);

      return response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async showPatient(id) {
    try {
      const response = await httpGet(`patients/${id}`);

      return response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updatePatient(data, id) {
    try {
      const response = await httpPut(`patients/${id}`, data);

      return response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getAllAlerts(id) {
    try {
      const response = await httpGet(`get-all-alerts/${id}`);

      return response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new PatientsService();
