import { httpGet } from '../config/api';

class DashboardService {
  async getAllInformations() {
    try {
      const response = await httpGet('dashboard');

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new DashboardService();
