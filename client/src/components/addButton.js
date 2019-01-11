import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableHighlight, View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
    position: 'absolute',
    bottom: 10,
    right: '44.1%',
  },
});

const AddButton = ({ onPress }) => (
  <View>
    <TouchableHighlight onPress={onPress} style={styles.button} underlayColor='transparent'>
      <Icon name="ios-add-circle" size={47} color='#02c8ef' />
    </TouchableHighlight>
  </View>

);

AddButton.propTypes = {
  onPress: PropTypes.func,
};


export default AddButton;