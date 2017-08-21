// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createUser } from '../../redux/actions';
import TextField from '../fields/TextField';
import EmailField from '../fields/EmailField';

export class SignUpForm extends Component {
  render() {
    const { handleSubmit, createUser, t } = this.props;
    return (
      <View>
        <Text>{t('fieldLabels.email')}</Text>
        <Field name="email" component={EmailField} />
        <Text>{t('fieldLabels.name')}</Text>
        <Field name="name" component={TextField} />
        <Text>{t('fieldLabels.password')}</Text>
        <Field name="password" component={TextField} />
        <Button onPress={handleSubmit(createUser)}>{t('fieldLabels.submit')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createUser: (userData) => dispatch(createUser(userData))
});

export default reduxForm({
  form: 'user-create'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(SignUpForm))
);
