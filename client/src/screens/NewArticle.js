import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet, Text, Alert, TouchableHighlight,Picker, View, TextInput,Input, ActivityIndicator, WebView, Image
} from 'react-native';
import { graphql, compose, Mutation } from 'react-apollo';
import { NEW_ARTICLE } from '../graphql/articles.query';


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
       
       return {
          
       };
   };

   constructor(props){
       super(props);
   }


 refreshNavigation(ready) {
   const { navigation } = this.props;
   navigation.setParams({
     create: this.create,
   });
 }

 goToInfoArticle = article => () => {
  const {
    navigation: { navigate },
  } = this.props;
  navigate('InfoArticles', { id: article.id, title: article.name, articleDescr: article.description });
};

 create = () => {
  const { createArticle, navigation } = this.props;
  const { name, price, description } = this.state;

  createArticle({
    name,
    price,
    description,
    userId: 1,
    
  })
    .then((res) => {
      navigation.dispatch(goToNewArticle(res.data.createArticle));
    })
    
};


 render() {
   const { navigation } = this.props;
  

   return (
   <View style={styles.container}>
       <Picker
          mode='dropdown'
          style={{ height: 50, width: 200 }}>
        
          <Picker.Item label="Elige una categoría" value="ere" />
          <Picker.Item label="Deportes" value="deportes" />
          <Picker.Item label="Pesca" value="pesca" />
          <Picker.Item label="Coches" value="coches" />
          <Picker.Item label="Juguetes" value="juguetes" />
          <Picker.Item label="Telefonía" value="telefonia" />
          <Picker.Item label="Tecnología" value="tecnologia" />
          <Picker.Item label="Bebes" value="bebes" />
          <Picker.Item label="Hogar" value="hogar" />
       </Picker>
    
      
       <TextInput style={styles.input}
               autoFocus
               maxLength={50}
               placeholder="Titulo"
               onChangeText={name => this.setState({ name })}              
       />
       <TextInput style={styles.input}
               onChangeText={price =>
                 isNaN(price) ? alert("Introduzca un precio valido. Gracias") : this.setState({ price })
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
        underlayColor="#02c8ef"
        onPress={this.create}>
        <Text> V e n d e r </Text>
       </TouchableHighlight>
      
     </View>
   );
 }
}

NewArticle.propTypes = {
  createArticle: PropTypes.func,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.object,
      article: PropTypes.object,
    }),
  }),

}

const createArticleMutation = graphql(NEW_ARTICLE, {
  props : ({ mutate }) => ({
    createArticle: name => mutate ({
      variables: { name },
      update: ({ data: { createArticle } } ) => {
        data.article.push(createArticle);
      }
    })
  })
})

export default compose( createArticleMutation )(NewArticle);

