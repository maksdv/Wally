import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, TouchableHighlight, View, Image, StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    margin: 3,
    alignItems: 'center',
    borderRadius: 8,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  oponent: {
    flex: 1,
    fontSize: 15,
    color: 'red',
    marginStart: 100,
  },
  articleImage: {
    marginStart: 5,
    width: '20%',
    height: '90%',
    borderRadius: 20,
  },
  text: {
    marginStart: 5,
  },
  messege: {
    width: '30%',
    height: 20,
  },
  iconoUser: {
    marginStart: 20,
  },
  articleName: {
    fontWeight: 'bold',
  },

});

const Chat = ({
  chat: {
    id, buyer, owner, from, messages,
  },
  goToMessages,
  user,
}) => (
  <TouchableHighlight key={id} onPress={goToMessages} underlayColor="transparent">
    <View style={styles.chatContainer}>
      <Image style={styles.articleImage} source={{ uri: from.image }} />
      <View style={styles.text}>
        <Text style={styles.articleName}>{from.name} </Text>
        {user.username === owner.username
          ? <Text style={styles.oponent}>{buyer.username} </Text>
          : <Text style={styles.oponent}>{owner.username} </Text>}
        <Text style={styles.messege}>{messages.edges[0].node.text}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

Chat.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  chat: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.shape({
      username: PropTypes.string,
    }),
    buyer: PropTypes.shape({
      username: PropTypes.string,
    }),
    articleId: PropTypes.number,
    messages: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
          }),
        }),
      ),
    }),
  }),
};

export default Chat;
