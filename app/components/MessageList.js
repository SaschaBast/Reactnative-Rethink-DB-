import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';
import moment from 'moment';

import SelectConversationForm from '../components/forms/SelectConversationForm';
import styles from '../styles';

export class MessageList extends Component {
  render() {
    const messages = this.props.messages[this.props.convId] || [];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(messages);
    return (
      <ListView style={styles.messageList} enableEmptySections={true}
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{`${rowData.user.name}: ${rowData.text} - ${moment(rowData.createdAt, 'x').format('LLL')}`}</Text>}>
      </ListView>
    );
  }
}

const mapStateToprops = (state: State) => ({
  messages: state.app.messages
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(MessageList);
