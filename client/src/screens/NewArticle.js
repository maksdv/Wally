import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
 FlatList, StyleSheet, Text, Button, TouchableHighlight,Picker, View, TextInput,Input, ActivityIndicator, WebView, Image
} from 'react-native';

import AddButton from '../components/addButton';
import { graphql, compose } from 'react-apollo';
import { ARTICLES_QUERY } from '../graphql/articles.query';

const styles = StyleSheet.create({
   container:{
     alignItems: 'center',
   },
   input: {
       borderBottomWidth: 0.5,
       borderColor: '#b7b9bc',
       width: '95%',
   },
   chooseCat: {
     marginTop: 10,
   },
   button:{
     alignItems: 'center',
     backgroundColor: '#69e0ba',
     padding: 10,
     borderRadius: 20,
     width: '80%',
     height: 40,
     marginTop: 20,

   }
})



class NewArticle extends Component{
   static navigationOptions = ({navigation}) => {
       const { state } = navigation;
       const isReady = state.params && state.params.mode === 'ready';
       return {
          
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

 goToMyArticles () {

 };

 render() {
   const { navigation } = this.props;
  

   return (
   <View style={styles.container}>
       <Picker
          mode='dropdown'
          style={{ height: 50, width: 200 }}>
        
          <Picker.Item label="Elige una categoría" value="null" />
          <Picker.Item label="Deportes" value="deportes" />
          <Picker.Item label="Pesca" value="pesca" />
          <Picker.Item label="Coches" value="coches" />
          <Picker.Item label="Juguetes" value="juhuetes" />
          <Picker.Item label="Telefonía" value="telefonia" />
          <Picker.Item label="Tecnología" value="tecnologia" />
          <Picker.Item label="Bebes" value="bebes" />
          <Picker.Item label="Hogar" value="hogas" />
       </Picker>
    
      
       <TextInput style={styles.input}
               autoFocus
               maxLength={50}
               placeholder="Titulo"
               onChangeText={value => this.setState({ value })
             }               
       />
       <TextInput style={styles.input}
               onChangeText={value =>
                 isNaN(value) ? alert("Introduzca un precio valido. Gracias") : this.setState({ value })
               }
               placeholder="Precio"
       />
       <TextInput
               maxLength={200}
               multiline={true}
               numberOfLines={4}
               onChangeText={description => this.setState({ description })}
               placeholder="Descripción"
               style={styles.input}
       />
       <TouchableHighlight
        style={styles.button}
        underlayColor="#6695e2"
        onPress={this.goToMyArticles}>
        <Text> V e n d e r </Text>
       </TouchableHighlight>
      
     </View>
   );
 }
}

export default NewArticle;

