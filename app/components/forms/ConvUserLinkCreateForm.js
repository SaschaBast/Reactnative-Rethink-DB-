// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text, Picker } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createConvUserLink } from '../../redux/actions';
import DropDown from '../fields/DropDown';

export class ConvUserLinkCreateForm extends Component {
  handleSubmit = (values: ConvUserLinkValueType) => {
    this.props.createConvUserLink({
      ...values,
      userId: this.props.currentUser.id
    });
  };

  render() {
    const { handleSubmit, conversations, t } = this.props;
    const pickerItems = conversations.map(conv => (
      <Picker.Item label={conv.title} value={conv.id} key={conv.id} />
    ));

    return (
      <View>
        <Text>{t('pageTitles.joinConversation')}: </Text>
        <Field name="convId" component={DropDown}>
          {pickerItems}
        </Field>
        <Button onPress={handleSubmit(this.handleSubmit)}>{t('fieldLabels.submit')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
  conversations: state.app.conversations,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createConvUserLink: (convUserLinkData) => {
    dispatch(createConvUserLink(convUserLinkData))
  }
});

export default reduxForm({
  form: 'conv-user-link-create'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(ConvUserLinkCreateForm))
);
