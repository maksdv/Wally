import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableHighlight, View, Header
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 const styles = StyleSheet.create({
    button:{
        zIndex: 100,
        position: 'absolute',
        bottom: 10,
        right: 161,
         
    }
});
 class AddButton extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
     addItem (){
       
    };
     render(){
        return(
            <View>
                <TouchableHighlight onPress={this.addItem} style={styles.button} underlayColor='transparent'>
                    <Icon name="ios-add-circle" size={47} color='#366cc1' />
                </TouchableHighlight>
            </View>
        );
    }
}
 export default AddButton;