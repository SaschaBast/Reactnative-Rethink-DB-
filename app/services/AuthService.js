import BaseService from './BaseService';

export default class AuthService extends BaseService {
  signin(data) {
    return this.post('/api/auth/signin')
      .send(data);
  }

  signout() {
    return this.get(`/api/auth/signout`);
  }
}
