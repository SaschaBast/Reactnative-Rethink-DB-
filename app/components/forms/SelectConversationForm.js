// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text, Picker } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { actions as routerActions } from 'react-native-router-redux';

import { selectConversation } from '../../redux/actions';
import DropDown from '../fields/DropDown';

export class SelectConversationForm extends Component {
  handleSubmit = (values) => {
    this.props.selectConversation(this.props.conversations[values.convIndex || 0]);
    this.props.goToChat();
  };

  render() {
    const { handleSubmit, conversations, t } = this.props;
    const pickerItems = conversations.map((conv, index) => (
      <Picker.Item label={conv.conversation.title} value={index} key={conv.id} />
    ));

    return (
      <View>
        <Text>{t('pageTitles.myConversations')}: </Text>
        <Field name="convIndex" component={DropDown}>
          {pickerItems}
        </Field>
        <Button onPress={handleSubmit(this.handleSubmit)}>{t('fieldLabels.view')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
  conversations: state.app.myConversations,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectConversation: (convUserLinkId) => {
    dispatch(selectConversation(convUserLinkId))
  },
  goToChat: () => dispatch({
    type: routerActions.actionTypes.ROUTER_PUSH,
    payload: {
      name: 'chat'
    }
  })
});

export default reduxForm({
  form: 'choose-my-conversation'
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(SelectConversationForm))
);
