import _ from 'lodash';
import socket from '../Socket';

export default class Subscriber {
  constructor (options, handler = () => {}, responseHandler = () => {}) {
    this.setOptions(options);
    this.setHandler(handler);
    this.setResponseHandler(responseHandler);
    this.itemsArray = [];
    this.subscribe();
  }

  setOptions(options) {
    this.options = Object.assign({}, options, this.options);
  }

  setHandler(handler) {
    this.handler = handler;
  }

  setResponseHandler(responseHandler) {
    this.responseHandler = responseHandler;
  }

  _handleReceivedData(response) {
    const {
      action,
      data,
      id
    } = response;
    if (id !== this.options.id) {
      return;
    }

    switch (action) {
      case 'get':
        this.itemsArray = data;
        break;
      case 'update':
        data.forEach((d) => {
          const el = _.find(this.itemsArray, { id: d.id });
          Object.assign(el, d);
        });
        break;
      case 'insert':
        this.itemsArray.push(...data);
        break;
      case 'delete':
        data.forEach((d) => {
          const index = _.findIndex(this.itemsArray, { id: d.id });
          this.itemsArray.splice(index, 1);
        });
        break;
      default:
        break;
    }

    if (this.handler) {
      this.handler(this.itemsArray);
    }

    if (this.responseHandler) {
      this.responseHandler(response);
    }
  }

  subscribe() {
    socket.on(this.getSubscriberName(), this._handleReceivedData.bind(this));
    socket.emit('subscribe', {
      subscriberName: this.getSubscriberName(),
      options: this.options
    });
  }

  unsubscribe() {
    socket.emit('unsubscribe', {
      subscriberName: this.getSubscriberName(),
      options: this.options
    });
  }

  getSubscriberName(): string {
    return '';
  }
}
