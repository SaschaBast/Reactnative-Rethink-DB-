import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';

import SelectConversationForm from '../components/forms/SelectConversationForm';
import styles from '../styles';

export class MyConversationsPage extends Component {
  render() {
    return (
      <View style={styles.page}>
        <SelectConversationForm />
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(MyConversationsPage);
