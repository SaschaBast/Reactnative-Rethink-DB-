import request from 'superagent';
import config from '../config';

export default class BaseService {
  getAPIUrl(url) {
    return `${config.apiUrl}${url}`;
  }

  get(url) {
    return request.get(this.getAPIUrl(url));
  }

  post(url) {
    return request.post(this.getAPIUrl(url));
  }

  delete(url) {
    return request.delete(this.getAPIUrl(url));
  }
}
