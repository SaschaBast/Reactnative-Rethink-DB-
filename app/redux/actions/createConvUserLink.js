import ConvUserLinkService from '../../services/ConvUserLinkService';
import { actions as routerActions } from 'react-native-router-redux';
import { Alert } from 'react-native';

const convUserLinkService = new ConvUserLinkService();

export default function(convUserLinkData) {
  return (dispatch, getState) => {
    return convUserLinkService.create(convUserLinkData)
      .then((resp) => {
        dispatch({
          type: routerActions.actionTypes.ROUTER_REPLACE,
          payload: {
            name: 'myConversations',
            tabBarName: 'conversationTabs'
          }
        });
      });
  }
}
