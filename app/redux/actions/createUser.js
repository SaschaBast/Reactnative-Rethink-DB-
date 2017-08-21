import { actions as routerActions } from 'react-native-router-redux';
import { createUserSuccess } from '../actions';
import UserService from '../../services/UserService';

const userService = new UserService();

export default function(userData) {
  return (dispatch, getState) => {
    userService.create(userData)
    .then((resp) => {
      dispatch(createUserSuccess(resp.body));
      dispatch({
        type: routerActions.actionTypes.ROUTER_REPLACE,
        payload: {
          name: 'createConversation',
          tabBarName: 'conversationTabs'
        }
      });
    });
  }
}
