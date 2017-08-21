// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';
import _ from 'lodash';

import { getI18nInstance } from '../i18n';
import LoginForm from '../components/forms/LoginForm';
import { actions as routerActions } from 'react-native-router-redux';
import styles from '../styles';

export class LoginPage extends Component {
  setLanguage(lng) {
    const i18n = getI18nInstance();
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.page}>
        <LoginForm />
        <Button onPress={this.props.goSignUp}>{t('pageTitles.createUser')}</Button>
        <Button onPress={_.partial(this.setLanguage, 'en')}>English</Button>
        <Button onPress={_.partial(this.setLanguage, 'fr')}>French</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goSignUp: () => dispatch({
    type: routerActions.actionTypes.ROUTER_PUSH,
    payload: {
      name: 'signup'
    }
  })
});

export default translate()(connect(mapStateToprops, mapDispatchToProps)(LoginPage));
