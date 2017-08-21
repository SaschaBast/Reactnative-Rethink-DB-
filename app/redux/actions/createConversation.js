import ConversationService from '../../services/ConversationService';
import { actions as routerActions } from 'react-native-router-redux';
import { Alert } from 'react-native';

const conversationService = new ConversationService();

export default function(conversationData) {
  return (dispatch, getState) => {
    conversationData = Object.assign({}, conversationData, {status: 'STARTED'});

    return conversationService.create(conversationData)
      .then((resp) => {
        // treat resp.body
        Alert.alert('Message', 'Conversation created!');
        console.log('Conversation created!', resp.body);
      });
  }
}
