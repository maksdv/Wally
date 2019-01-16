import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import DELETE_CHAT from '../graphql/chats.query';

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  
});

 class ChatDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
      });

    constructor(props) {
     super(props);

     this.deleteChat = this.deleteChat.bind(this);

    }

    keyExtractor = item => item.id.toString();

    deleteChat() {
        const { deleteChat, navigation } = this.props;
        deleteChat(navigation.state.params.id)
          .then(() => {
            navigation.dispatch(resetAction);
          })
          .catch((e) => {
            console.log(e); // eslint-disable-line no-console
          });
      }
  
 render() {
    const { chat } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          ListFooterComponent={() => (
            <View>
              <Button              
              title="Delete Chat" 
              onPress={this.deleteChat} 
              />
            </View>
          )}
        />
      </View>
    );
  }
}

ChatDetails.propTypes = {
    loading: PropTypes.bool,
    chat: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      users: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          username: PropTypes.string,
        }),
      ),
    }),
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          title: PropTypes.string,
          id: PropTypes.number,
        }),
      }),
    }),
    deleteChat: PropTypes.func.isRequired,
  };




  const deleteChatMutation = graphql(DELETE_CHAT, {
    props: ({ mutate }) => ({
      deleteChat: id => mutate({
        variables: { id },
        update: (store, { data: { deleteChat } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USER_QUERY, variables: { id: 1 } }); // fake for now
           // Add our message from the mutation to the end.
          data.user.chats = data.user.chats.filter(g => deleteChat.id !== g.id);
           // Write our data back to the cache.
          store.writeQuery({
            query: US_QUERY,
            variables: { id: 1 }, // fake for now
            data,
          });
        },
      }),
    }),
  });




 export default compose(
    deleteChatMutation,  
)(ChatDetails);


