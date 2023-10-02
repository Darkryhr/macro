import React from 'react';
import { TextInput } from 'react-native';

const NumberInput = ({ value, handleChange }) => {
  const onlyNumbers = new RegExp('^[0-9]*$');

  const checkValue = (e: string) => {
    if (onlyNumbers.test(e)) {
      handleChange(!Number.isNaN(parseInt(e, 10)) ? parseInt(e, 10) + '' : '0');
    } else {
      return;
    }
  };

  return <TextInput value={value} placeholder='0' onChangeText={checkValue} />;
};

export default NumberInput;
