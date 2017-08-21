import { actions as routerActions } from 'react-native-router-redux';
import { Alert } from 'react-native';

import { authSigninSuccess, authSigninFailure } from '../actions';
import AuthService from '../../services/AuthService';

const authService = new AuthService();

export default function(authData) {
  return (dispatch, getState) => {
    authService.signin(authData)
    .then((resp) => {
      dispatch(authSigninSuccess(resp.body));
      dispatch({
        type: routerActions.actionTypes.ROUTER_REPLACE,
        payload: {
          name: 'myConversations',
          tabBarName: 'conversationTabs'
        }
      });
    })
    .catch((err) => {
      console.log(err);
      let message = 'Unknown Error';
      if (err && err.response && err.response.body.message) {
        message = err.response.body.message;
      }
      Alert.alert('Login Error', message);
    });
  }
}
