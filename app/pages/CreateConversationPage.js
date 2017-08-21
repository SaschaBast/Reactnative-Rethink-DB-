import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';

import ConversationCreateForm from '../components/forms/ConversationCreateForm';
import styles from '../styles';

export class CreateConversationPage extends Component {
  render() {
    return (
      <View style={styles.page}>
        <ConversationCreateForm />
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(CreateConversationPage);
