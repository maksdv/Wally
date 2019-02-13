import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import AddButton from "../../../components/addButton";
import Article from "./article";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dce0e8",
    flex: 1
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
  loading: {
    justifyContent: "center",
    flex: 1
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
      twoColumn: true
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
    const { text } = this.state;
    const { loading, articles, user } = this.props;
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
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={newText => this.setState({ text: newText })}
          value={text}
        />
        <FlatList
          data={articles.filter(x =>
            x.name.toLowerCase().includes(text.toLowerCase())
          )}
          numColumns={2}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View>
          <AddButton onPress={this.goToNewArticle(user)} />
        </View>
      </View>
    );
  }
}

export default Articles;
