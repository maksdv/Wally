import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator,Image
} from 'react-native';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';
import { CHAT_QUERY } from '../graphql/chats.query';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce0e8',
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    margin:3,
    alignItems: 'center',
    borderRadius: 8,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor:"grey",
    backgroundColor: '#fff',
    
  },
  oponent: {
    flex: 1,
    /* marginStart:"50%", */
    fontSize:15,
    
  },
  articleImage:{
    marginStart:5,
    width: "20%",
    height:"90%",
    borderRadius:20
  },
  text:{
    
    marginStart: 5,
    
  },
  iconoUser:{
    marginStart: 20,
  },
  articleName:{
    fontWeight: 'bold',
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  time:{
    fontSize:11
  }
});

const Chat = ({ chat: { id, buyer, owner, from, messages}, goToMessages , user}) => (

  <TouchableHighlight key={id} onPress={goToMessages} underlayColor="transparent">
    <View style={styles.chatContainer}>
      <Image style={styles.articleImage} source={{ uri: from.image }} />
      <Icon style={styles.iconoUser} name="ios-contact" size={15} color='#02c8ef' />
      <View style={styles.text}>
        <Text style={styles.articleName}>{from.name} </Text>
        
        {user.username == owner.username ? 
        <Text style={styles.oponent}>{buyer.username} </Text> : 
        <Text style={styles.oponent}>{owner.username} </Text>}       
        {/* <Text style={styles.time}>{ (messages) ? format(messages[messages.length-1].createdAt, 'H:mm D/MMM/YYYY' ): null}</Text> */}
        
      </View>
      
    </View>
  </TouchableHighlight>
);

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id.toString();

  goToMessages = chat => () => {
    const {
      navigation: { navigate },
    } = this.props;
    console.log(chat);
    navigate('Messages', { id: chat.id });
  };

  renderItem = ({ item }) => <Chat chat={item} goToMessages={this.goToMessages(item)} user={this.props.user} />;

  render() {
    const { loading, user } = this.props;

    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    

    return (
      <View style={styles.container}>
        <FlatList
          data={user.chats}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

/* Chat.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.number,
    buyer: PropTypes.number,
    articleId: PropTypes.number,
  }),
};

Chats.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.number.isRequired,
          username: PropTypes.string,
        }),
      }),
    ),
  }),
}; */

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});




export default compose(userQuery)(Chats);
