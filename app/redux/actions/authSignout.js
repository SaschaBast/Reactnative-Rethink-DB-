import { actions as routerActions } from 'react-native-router-redux';
import { Alert } from 'react-native';

import { authSignoutSuccess } from '../actions';
import AuthService from '../../services/AuthService';

const authService = new AuthService();

export default function() {
  return (dispatch, getState) => {
    authService.signout()
    .then((resp) => {
      dispatch(authSignoutSuccess(resp.body));
      Alert.alert('Message', 'You are logged out');
      dispatch({
        type: routerActions.actionTypes.ROUTER_RESET,
        payload: {
          name: 'login'
        }
      });
    });
  }
}
