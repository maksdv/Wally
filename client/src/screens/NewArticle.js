import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableHighlight, View, TextInput,Input, ActivityIndicator, WebView, Image
} from 'react-native';
import AddButton from '../components/addButton';
import { graphql, compose } from 'react-apollo';
import { ARTICLES_QUERY } from '../graphql/articles.query';
import PhotoUpload from 'react-native-photo-upload'



const styles = StyleSheet.create({
    container:{
      alignItems: 'center',
    },
    input: {
        borderBottomWidth: 0.5,
        borderColor: '#b7b9bc',
        width: '95%',
        
        

    },
    
})

class NewArticle extends Component{
    static navigationOptions = ({navigation}) => {
        const { state } = navigation;
        const isReady = state.params && state.params.mode === 'ready';
        return {
            title: 'New Article',
            eaderRight: isReady ? (
                <View style={{ paddingRight: 10 }}>
                  <Button title="Create" onPress={state.params.create} />
                </View>
              ):(
                undefined
            ),
        };
    };

    constructor(props){
        super(props);
    }


  refreshNavigation(ready) {
    const { navigation } = this.props;
    navigation.setParams({
      mode: ready ? 'ready' : undefined,
      create: this.create,
    });
  }

  render() {
    const { navigation } = this.props;
    

    return (
    <View style={styles.container}>
        <TextInput style={styles.input}
                autoFocus
                maxLength={50}
                onChangeText={name => this.setState({ name })}
                placeholder="Titulo"
                
        />
        <TextInput style={styles.input}
                autoFocus
                onChangeText={price => this.setState({ price })}
                placeholder="Precio"
                
        />
        <TextInput
                autoFocus
                maxLength={200}
                onChangeText={description => this.setState({ description })}
                placeholder="Descripción"
                style={styles.input}
        />      
      
        
    </View>
    
    );
  }
}

export default NewArticle;