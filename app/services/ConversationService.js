import BaseService from './BaseService';

export default class ConversationService extends BaseService {
  create(data) {
    return this.post('/api/conversations')
      .send(data);
  }

  list() {
    return this.get('/api/conversations');
  }
}
