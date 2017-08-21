import BaseService from './BaseService';

export default class MessageService extends BaseService {
  create(data) {
    return this.post('/api/messages')
      .send(data);
  }

  list() {
    return this.get('/api/messages');
  }
}
