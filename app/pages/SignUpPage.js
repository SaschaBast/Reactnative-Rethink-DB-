import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Button  from 'react-native-button';

import SignUpForm from '../components/forms/SignUpForm';
import styles from '../styles';

export class SignUpPage extends Component {
  render() {
    return (
      <View style={styles.page}>
        <SignUpForm />
      </View>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(SignUpPage);
