import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { USER_QUERY, EDIT_USER_MUTATION } from '../graphql/user.query';
import PFP from '../images/perfil.jpeg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: '#c3cce0',
  },
  input: {
    marginBottom: 15,
    marginTop: 0,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    borderColor: '#c7d6db',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  label: {
    marginBottom: 20,
    marginLeft: 10,
    height: 40,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginTop: 40,
    marginBottom: 40,
    width: 90,
    height: 90,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'center',
  },
  profile: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  button: {
    marginVertical: 50,
    marginHorizontal: 150,
  },
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      newName: user.username,
      newEmail: user.email,
    };
  }
  
  update = () => {
    const { editUser, user, navigation } = this.props;
    const {
      newName,
      newEmail,
    } = this.state;
  
    editUser({
      id: user.id,
      username: newName,
      email: newEmail,
    });
    alert('Usuario actualizado.');
    navigation.navigate('Profile');
  };
  
  render() {
    const {
      user: {
        username,
        email,
      },
    } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.profileContainer}>
            <Image style={styles.profile} source={PFP}/>
          </View>
          <Text style={styles.label}>{username}</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="New username"
            onChangeText={newName => this.setState({ newName })}
          />
          <Text style={styles.label}>{email}</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="New email"
            onChangeText={newEmail => this.setState({ newEmail })}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.update}
            title="Change"
            color="blue"
          />
        </View>
      </View>
    );
  }
}
  
  const editUserMutation = graphql(EDIT_USER_MUTATION, {
    props: ({ mutate }) => ({
      editUser: user => mutate({
        variables: { user },
        update: (store, { data: { editUser } }) => {
          const data = store.readQuery({
            query: USER_QUERY,
            variables: {
              id: user.id,
            },
          });
          data.user.username = editUser.username;
          data.user.email = editUser.email;
  
          store.writeQuery({
            query: USER_QUERY,
            variables: {
              id: user.id,
            },
            data,
          });
        },
      }),
    }),
  });
  
  const mapStateToProps = ({ auth }) => ({
    auth,
  });
  
  const userQuery = graphql(USER_QUERY, {
    options: auth => ({ variables: { id: auth.auth.id } }), // fake the user for now
    props: ({ data: { loading, user } }) => ({
      loading,
      user,
      loggedUser: true
    }),
  });
  
  export default compose(
    connect(mapStateToProps),
    userQuery,
    editUserMutation,
  )(EditProfile);
