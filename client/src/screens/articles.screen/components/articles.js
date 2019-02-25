import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import AddButton from "../../../components/addButton";
import Icon from "react-native-vector-icons/Ionicons";
import Article from "./article";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dce0e8"
    //flexDirection: 'column',
  },
  input: {
    
    marginStart: "10%",
    width: "80%",
    height: 40,
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 10,
    margin: 2
  },
  inputDos: {
    marginStart: "10%",
    width: "80%",
    height: 40,
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 10,
    margin: 2
  },
  loading: {
    justifyContent: "center",
    flex: 1
  },
  header: {
    flexDirection: "row"
  }
});

class Articles extends Component {
  static navigationOptions = {
    title: "Store"
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      twoColumn: 2,
      inputColor: false
    };
  }

  keyExtractor = item => item.id.toString();

  goToInfoArticle = article => () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("InfoArticles", {
      id: article.id,
      title: article.name,
      articleDescr: article.description
    });
  };

  goToNewArticle = user => () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("NewArticle", { id: user.id });
  };

  renderItem = ({ item }) => (
    <Article article={item} goToInfoArticle={this.goToInfoArticle(item)} />
  );

  render() {
    const { text, twoColumn, inputColor } = this.state;
    const { loading, articles, user } = this.props;
    const inputStyle = {
      ...styles.input,
      borderColor: (inputColor) ? '#02c8ef' : '#aaa',
      borderWidth: (inputColor) ? 2 : 1,
    };

    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!user) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={inputStyle}
            placeholder="Search"
            onChangeText={newText => this.setState({ text: newText })}
            value={text}
            onFocus={() => this.setState({ inputColor: !inputColor })}
            onBlur={() => this.setState({ inputColor: !inputColor })}
          />
          {twoColumn === 1 ? (
            <Icon
              style={{ marginStart: 8, marginTop: 10, color: "#02c8ef" }}
              name="ios-albums"
              color="grey"
              size={24}
              onPress={() =>
                this.setState({ twoColumn: twoColumn === 2 ? 1 : 2 })
              }
            />
          ) : (
            <Icon
              style={{ marginStart: 8, marginTop: 10 }}
              name="ios-albums"
              color="grey"
              size={24}
              onPress={() =>
                this.setState({ twoColumn: twoColumn === 2 ? 1 : 2 })
              }
            />
          )}
        </View>
        <FlatList
          key={twoColumn}
          data={articles.filter(x =>
            x.name.toLowerCase().includes(text.toLowerCase())
          )}
          numColumns={twoColumn}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={{
            justifyContent: "space-around",
            paddingHorizontal: 5
          }}
        />
        <View>
          <AddButton onPress={this.goToNewArticle(user)} />
        </View>
      </View>
    );
  }
}

export default Articles;
