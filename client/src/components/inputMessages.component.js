import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderColor: '#dbdbdb',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  sendButtonContainer: {
    paddingRight: 12,
    paddingVertical: 6,
  },
  sendButton: {
    height: 32,
    width: 32,
  },
  iconStyle: {
    marginRight: 0, // default is 12
  },
});
const sendButton = send => (
  <Icon.Button
    backgroundColor="white"
    color="black"
    iconStyle={styles.iconStyle}
    name="send"
    onPress={send}
    size={18}
    style={styles.sendButton}
  />
);
class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSend = () => {
    const { text } = this.state;
    const { send } = this.props;
    send(text);
    this.textInput.clear();
    this.textInput.blur();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => {
              this.textInput = ref;
            }}
            onChangeText={text => this.setState({ text })}
            style={styles.input}
            placeholder="Type a message here.."
          />
        </View>
        <View style={styles.sendButtonContainer}>{sendButton(this.handleSend)}</View>
      </View>
    );
  }
}
MessageInput.propTypes = {
  send: PropTypes.func.isRequired,
};
export default MessageInput;
