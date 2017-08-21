import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';

import { deleteConvUserLink } from '../redux/actions';
import MessageCreateForm from '../components/forms/MessageCreateForm';
import MessageList from '../components/MessageList';
import styles from '../styles';

export class ChatPage extends Component {
  deleteConvUserLink = () => {
    this.props.deleteConvUserLink(this.props.activeConversation.id);
  };

  render() {
    const { activeConversation, t } = this.props;
    if (!activeConversation) {
      return null;
    }

    return (
      <View style={styles.page}>
        <MessageList convId={activeConversation.conversation.id} />
        <MessageCreateForm convId={activeConversation.conversation.id} />
        <Button onPress={this.deleteConvUserLink}>{t('fieldLabels.leaveConversation')}</Button>
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
  activeConversation: state.app.activeConversation
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteConvUserLink: (convUserLinkId: string) => dispatch(deleteConvUserLink(convUserLinkId))
});

export default translate()(connect(mapStateToprops, mapDispatchToProps)(ChatPage));
