// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text, Alert } from 'react-native';
import { actions as routerActions } from 'react-native-router-redux';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { authSignin } from '../../redux/actions';
import EmailField from '../fields/EmailField';
import PasswordField from '../fields/PasswordField';

export class LoginForm extends Component {
  componentWillReceiveProps(nextProps) {
    // user is already signed in
    // @TODO show notification only on rehydrate from persist storage
    if (nextProps.currentUser && nextProps.currentUser.email && nextProps.currentUser.email !== this.props.currentUser.email) {
      Alert.alert('Notification', `You are signed in as ${nextProps.currentUser.email}`);
      this.props.goToMyConversations();
    }
  }

  render() {
    const {handleSubmit, authSignin, t} = this.props;

    return (
      <View>
        <Text>{t('fieldLabels.email')}</Text>
        <Field name="email" component={EmailField} />
        <Text>{t('fieldLabels.password')}</Text>
        <Field name="password" component={PasswordField} />
        <Button onPress={handleSubmit(authSignin)}>Sign In</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authSignin: (userData) => {
    dispatch(authSignin(userData))
  },
  goToMyConversations: () => dispatch({
    type: routerActions.actionTypes.ROUTER_REPLACE,
    payload: {
      name: 'myConversations',
      tabBarName: 'conversationTabs'
    }
  })
});

export default reduxForm({
  form: 'user-login'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(LoginForm))
);
