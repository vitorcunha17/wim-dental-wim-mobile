import { httpPost, httpGet } from '../config/api';

class AuthService {
  async login(email, password) {
    try {
      const response = await httpPost('session-mobile', {
        email,
        password,
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async verifyToken() {
    try {
      const response = await httpGet('session');
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async forgotPassword(email) {
    try {
      const response = await httpPost('recover-password', {
        email,
        app: 'mobile',
      });
      return response.json();
    } catch (err) {
      return false;
    }
  }
}

export default new AuthService();
