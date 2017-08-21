import React, { Component } from 'react';
import { Picker } from 'react-native';
import styles from '../../styles';

export default class DropDown extends Component {
  render(){
    const { input: { value, onChange }, ...otherProps } = this.props;
    return (
      <Picker
        onValueChange={(value) => onChange(value)}
        selectedValue={value}
        {...otherProps}
      />
    );
  }
}
