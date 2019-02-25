import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import React, { Component } from 'react';
import Message from './message';
import MessageInput from './input';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#edf4ff',
    flex: 1,
    flexDirection: 'column',
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleImage: {
    marginRight: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: (
        <TouchableOpacity style={styles.titleWrapper}>
          <View style={styles.title}>
            <Image
              style={styles.titleImage}
              source={{ uri: 'https://reactjs.org/logo-og.png' }}
            />
            <Text>{state.params.name}</Text>
          </View>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props, navigation) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {};
  }

  componentDidMount() {
    console.log('PORPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsss', this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log('NEXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', nextProps);

  }


  send = (text) => {
    const { addMessage, chat, auth } = this.props;
    console.log(chat.id, "chatId", "userID>>", auth.id);
    addMessage({
      chatId: chat.id,
      userId: auth.id,
      text,
    })
      .then(() => {
        this.flatList.scrollToEnd({ animated: true });
      })
      .catch(err => console.log(err));
  };

  onEndReached = () => {
    const { loadingMoreEntries } = this.state;
    const { loadMoreEntries, chat } = this.props;
    if (!loadingMoreEntries && chat.messages.pageInfo.hasNextPage) {
      this.setState({
        loadingMoreEntries: true,
      });
      loadMoreEntries().then(() => {
        this.setState({
          loadingMoreEntries: false,
        });
      });
    }
  };

  keyExtractor = item => item.node.id.toString();

  renderItem = ({ item: edge }) => {
    const message = edge.node;
    const { auth } = this.props; // fucking the user for now ;)
    return (
      <Message
        color="#000000"
        isCurrentUser={message.from.id === auth.id}
        message={message}
      />
    );
  };

  render() {
    const { chat, navigation } = this.props;
    if (!chat) {
      <ActivityIndicator color="red" />;
    }

    console.log("CHATSSSSSSSSSSSSSSSSSss", this.props);

    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          //inverted
          data={chat ? chat.messages.edges : []}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
          onEndReachedThreshold={0.9}
          onEndReached={this.onEndReached}
        />
        <MessageInput send={this.send} />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(connect(mapStateToProps))(Messages);
