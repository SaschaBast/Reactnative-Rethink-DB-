import BaseService from './BaseService';

export default class ConvUserLinkService extends BaseService {
  create(data) {
    return this.post('/api/conv-user-links')
      .send(data);
  }

  delete(id) {
    return super.delete(`/api/conv-user-links/${id}`);
  }

  list() {
    return this.get('/api/conv-user-links');
  }
}
