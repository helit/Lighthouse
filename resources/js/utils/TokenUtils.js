export default class TokenUtils {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static resetToken(token) {
    this.removeToken();
    this.setToken(token);
  }
}
