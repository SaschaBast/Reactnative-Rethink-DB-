// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createConversation } from '../../redux/actions';
import TextField from '../fields/TextField';

export class ConversationCreateForm extends Component {
  render() {
    const { handleSubmit, createConversation, t } = this.props;

    return (
      <View>
        <Text>{t('fieldLabels.title')}</Text>
        <Field name="title" component={TextField} />
        <Button onPress={handleSubmit(createConversation)}>{t('fieldLabels.submit')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createConversation: (conversationData) => {
    dispatch(createConversation(conversationData))
  }
});

export default reduxForm({
  form: 'conversation-create'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(ConversationCreateForm))
);
