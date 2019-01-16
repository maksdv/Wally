
import {
    StyleSheet, View, TextInput, Alert, Button, Text, ActivityIndicator, Image,
  } from 'react-native';
  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  import { navigation } from 'react-navigation';
  import { graphql, compose } from 'react-apollo';
  import { USERS, GET_USER } from '../../graphql/user.query';

  const styles = StyleSheet.create({

      global:{
        flex:1,
        backgroundColor: '#c3cce0',
       
         
      },
      logo:{
        marginStart:"10%",
        width:'80%'
      },
      input:{
          borderRadius:15,
          borderWidth:1,
          borderColor:'grey',
          backgroundColor:'#d1d3d6',
          margin: 10,
      },
      buttonLog:{
          width:'33.3%',
          marginStart:'33.3%', 
      },
      texto:{
        marginStart:'33.5%',
        margin:10,
      },
      buttonSigUp:{
          width:'20%',
          marginStart:'40%'
      }
  })

  class Login extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${'Login'}`,
      });


      constructor(props) {
        super(props);
        this.state = {
          username:'',
          password:'',
          obj:'Mostrar',
          logOk: false,
          kk:[]
        };
      }

    

    goToRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
    }

    usernameInput = (text) => {
        this.setState({
          username: text,
        });
    };

    passwordInput = (text) => {
        this.setState({
          password: text,
        });
    };


    
    login = async () => {
        
        const {
           username,password,logOk
          } = this.state;
        const {
            users
        } = this.props;
    
        users.filter(r => r.username == username ? this.setState({ logOk:true }) : null)
        console.log(users[0].username)
    
        if(logOk){
            const { navigation } = this.props;
            navigation.navigate('Store');
        }else{
            Alert.alert("Usuario o la contraseña no coinciden.");
        } 
    }

    changeState = () =>{
        const { obj } = this.state;
        if (obj === 'Mostrar') {
            this.setState({
                obj:'ha cambiado'
            })
        } else {
            this.setState({
                obj:'Mostrar'
            })
        }

    }
    

    render(){
        const {
           username,password
          } = this.state;
        return(
            <View style={styles.global}>
                <Image
                    style={styles.logo}
                    source={require('../../images/logo.png')}
                    
                />
                <TextInput style={styles.input} 
                    placeholder={'Your NickName'}
                    value={username}
                    onChangeText={this.usernameInput}
                />
                <TextInput style={styles.input} 
                    placeholder={'Your password'}
                    value={password}
                    onChangeText={this.passwordInput}
                    secureTextEntry
                    
                />

                <View style={styles.buttonLog} >
                    <Button color={'#0a50db'} 
                        title={'Login'} 
                        onPress={this.login}/>
                </View>


                <Text style={styles.texto}>
                    Not registered yet?
                </Text>
                <View style={styles.buttonSigUp} >
                    <Button color={'#0a50db'} 
                        title={'Sign UP'} 
                        onPress={this.goToRegister}
                        
                        />
                </View>

            </View>
        );
    }
  }
  
  /* const userLogin = graphql(GET_USER, {
    options: () => ({ variables: { username: "Jaimea", password: "qq" } }), // fake the user for now
    props: ({ data: { loading, user } }) => ({
      loading,
      user,
    }),
  }); */

  const userss = graphql(USERS, {
    options: () => ({}),
    props: ({ data: { loading, users } }) => ({
      loading,
      users: users || [],
    }),
  });

  export default compose (userss) (Login);