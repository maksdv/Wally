import {
   StyleSheet, View,Text, ActivityIndicator, Image,
  } from 'react-native';
  import React, { Component } from 'react';
  import Icon from 'react-native-vector-icons/Ionicons';
  import PropTypes from 'prop-types';
  import { graphql, compose } from 'react-apollo';
  import { USER_QUERY } from '../graphql/user.query';

  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#dce0e8',
    },
    userImage:{
        width:200,
        height: 240,
        marginTop:10,
        borderWidth:2,
        borderColor:"grey",
        borderRadius:200,
        alignSelf: "center",
    },
    uName:{
        alignSelf:"center",
        fontWeight: 'bold',
        borderBottomWidth:0.5,
        fontSize: 20,
        marginTop:10,
        color: "#02c8ef"
    },
    articlesSelling:{
        margin: 10,
        flexDirection: 'row',
    },
    num:{
       fontSize: 34,
       marginStart: 10,
    }
  })

  class Profile extends Component{



    render(){
        const { loading, user } = this.props;
        return(
            <View style={styles.container}>
                <Image style={styles.userImage}
                    source={require('../images/perfil.jpeg')}/>
                <Text style={styles.uName}>{user.username}</Text>
                <Text style={styles.uName} >{user.email}</Text>
                <View style={styles.articlesSelling}> 
                    <Icon  name="ios-cart" size={40} color='#02c8ef' />  
                    <Text style={styles.num}>{user.articles.length}</Text>
                </View>
            </View>
            
        )
    }
  }

  const userQuery = graphql(USER_QUERY, {
    options: () => ({ variables: { id: 1 } }), // fake the user for now
    props: ({ data: { loading, user } }) => ({
      loading,
      user,
    }),
  });
  
  
  
  
  export default compose(userQuery)(Profile);