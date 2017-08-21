import { setConversations } from '../actions';
import ConversationService from '../../services/ConversationService';

const conversationService = new ConversationService();

export default function() {
  return (dispatch, getState) => {
    return conversationService.list()
    .then((resp) => {
      // @TODO handle success, error
      dispatch(setConversations(resp.body));
    })
  }
}
