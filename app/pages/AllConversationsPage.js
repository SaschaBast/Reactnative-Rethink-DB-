import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';

import ConvUserLinkCreateForm from '../components/forms/ConvUserLinkCreateForm';
import styles from '../styles';

export class AllConversationsPage extends Component {
  render() {
    return (
      <View style={styles.page}>
        <ConvUserLinkCreateForm />
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(AllConversationsPage);
