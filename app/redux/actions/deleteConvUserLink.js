import { actions as routerActions } from 'react-native-router-redux';
import { Alert } from 'react-native';

import ConvUserLinkService from '../../services/ConvUserLinkService';
const convUserLinkService = new ConvUserLinkService();

export default function(convUserLinkId) {
  return (dispatch, getState) => {
    return convUserLinkService.delete(convUserLinkId)
      .then((resp) => {
        // @TODO handle success, error
        Alert.alert('Message', 'Successfully unsubcribed from convesation.');
        dispatch({
          type: routerActions.actionTypes.ROUTER_POP
        });
      });
  }
}
