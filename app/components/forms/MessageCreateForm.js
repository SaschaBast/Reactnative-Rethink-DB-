import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createMessage } from '../../redux/actions';
import TextField from '../fields/TextField';

export class MessageCreateForm extends Component {
  handleSubmit = (values) => {
    this.props.createMessage({
      ...values,
      convId: this.props.convId,
      userId: this.props.currentUser.id
    });
    this.props.reset();
  };

  render() {
    const { handleSubmit, t } = this.props;

    return (
      <View>
        <Text>{t('fieldLabels.message')}</Text>
        <Field name="text" component={TextField} />
        <Button onPress={handleSubmit(this.handleSubmit)}>{t('fieldLabels.send')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createMessage: (messageData) => dispatch(createMessage(messageData))
});

export default reduxForm({
  form: 'create-message'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(MessageCreateForm))
);
