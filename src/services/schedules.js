import { httpGet, httpPost, httpPut, httpDelete } from '../config/api';

class SchedulesService {
  async getAllForDentist(initialDate, finalDate, userId) {
    try {
      const response = await httpGet(
        `mobile/schedules?date_end=${finalDate}&date_start=${initialDate}&search=&showDeleted=false&user_id=${userId}`
      );

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async createSchedule(data) {
    try {
      const response = await httpPost('schedules', data);

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateSchedule(data, id) {
    try {
      const response = await httpPut(`schedules/${id}`, data);

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSchedule(id, reason) {
    try {
      const response = await httpDelete(`schedules/${id}?reason=${reason}`);

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SchedulesService();
