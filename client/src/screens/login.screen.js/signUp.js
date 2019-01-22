import { graphql, compose } from 'react-apollo';
import {
  StyleSheet, View, TextInput, Input, Alert, Button, Text, Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NEW_USER } from '../../graphql/user.query';

const styles = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: '#c3cce0',
  },
  text: {
    marginStart: '30%',
    color: '#0a50db'
  },
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#d1d3d6',
    margin: 5,
  },
  buttonReg: {
    width: '33.3%',
    marginStart: '33.3%',
  },
  logo: {
    marginStart: '10%',
    width: '80%',
  },
})

const goodEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
const goodUsername = username => /^[a-zA-Z0-9_-]{3,16}$/.test(username);

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repassword: '',
    };
  }

  userNaCreate = (text) => {
    this.setState({
      username: text,
    });
  };

  emailCreate = (text) => {
    this.setState({
      email: text,
    });
  };

  passwordCreate = (text) => {
    this.setState({
      password: text
    });
  };

  repasswordCreate = (text) => {
    this.setState({
      repassword: text,
    });
  };



  addUser = async () => {
    const {
      email, username, password, repassword
    } = this.state;
    if (!email || !goodEmail(email)) {
      Alert.alert('The email adress is empty or contains wrong characters.')
    } else {
      if (!username || !goodUsername(username)) {
        Alert.alert('The alias is empty or contains wrong characters.')
      } else {
        if ((!password || !repassword) || (password !== repassword)) {
          Alert.alert('The password form must be complete correctly.')
        } else {
          const { addUser, navigation } = this.props;
          await addUser(email, username, password);
          Alert.alert('Welcome :)')
          navigation.navigate('Login');
        }
      }
    }

  }


  render() {
    const {
      email, username, password, repassword
    } = this.state;
    return (
      <View style={styles.global}>
        <Image
          style={styles.logo}
          source={require('../../images/logo.png')}

        />
        <Text style={styles.text} >Complete this form:</Text>
        <TextInput style={styles.input}
          placeholder={'Your email'}
          value={email}
          onChangeText={this.emailCreate}
        />
        <TextInput style={styles.input}
          placeholder={'Your NickName'}
          value={username}
          onChangeText={this.userNaCreate}
        />
        <TextInput style={styles.input}
          placeholder={'Your password'}
          value={password}
          onChangeText={this.passwordCreate}
          secureTextEntry
        />
        <TextInput style={styles.input}
          placeholder={'Repeat your password'}
          value={repassword}
          onChangeText={this.repasswordCreate}
          secureTextEntry
        />
        <View style={styles.buttonReg}>
          <Button title={'Register'}
            color={'#0a50db'}
            onPress={this.addUser} />

        </View>
      </View>

    );
  }
}
const addUser = graphql(NEW_USER, {
  props: ({ mutate }) => ({
    addUser: (email, username, password) => mutate({
      variables: { email, username, password }
    })
  })
});




export default compose(addUser)(Register);