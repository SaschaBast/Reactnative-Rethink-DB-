import BaseService from './BaseService';

export default class UserService extends BaseService {
  create(data) {
    return this.post('/api/users')
      .send(data);
  }

  get(id) {
    return this.get(`/api/users/${id}`);
  }

  list() {
    return this.get('/api/users');
  }
}
