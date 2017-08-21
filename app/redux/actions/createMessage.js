import MessageService from '../../services/MessageService';

const messageService = new MessageService();

export default function(messageData) {
  return (dispatch, getState) => {
    messageData = Object.assign({}, messageData);

    return messageService.create(messageData)
      .then((resp) => {
        // treat resp.body
        console.log('Message created!', resp.body);
      });
  }
}
