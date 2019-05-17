export default class TokenUtils {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getResetToken() {
    return 'not a reset token';
  }

  static removeToken() {
    localStorage.removeItem('token');
  }
}
