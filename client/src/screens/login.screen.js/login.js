import React, { Component } from "react";
import R from "ramda";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { NavigationActions } from "react-navigation";

import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { setCurrentUser, logout } from "../../actions/auth.actions";
import { LOG_USER, NEW_USER } from "../../graphql/user.query";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10
  },
  inputContainer: {
    marginBottom: 10
  },
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "#d1d3d6",
    margin: 5
  },
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12
  },
  switchAction: {
    paddingHorizontal: 6,
    color: "blue"
  },
  submit: {
    width: 40
  },
  logo: {
    marginStart: "10%",
    width: "80%"
  }
});

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

class Signin extends Component {
  static navigationOptions = {
    title: "Chatty",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    if (props.auth && props.auth.jwt) {
      props.navigation.goBack();
    }

    this.state = {
      view: "login",
      email: "kk@kk.es",
      username: "Name",
      password: "123"
    };
  }

  componentDidMount() {
    const {
      auth: { jwt },
      navigation: { navigate }
    } = this.props;
    if (jwt) navigate("App");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.jwt) {
      nextProps.navigation.goBack();
    }
  }


  login = () => {
    const { email, password, username, view } = this.state;
    const { login, dispatch } = this.props;

    this.setState({
      loading: true
    });

    login({ email, password })
      .then(({ data: { login: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false
        });
        dispatch(
          NavigationActions.navigate({
            routeName: "App"
          })
        );
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        Alert.alert(`${capitalizeFirstLetter(view)} error`, error.message, [
          { text: "OK", onPress: () => console.log("OK pressed") }, // eslint-disable-line no-console
          {
            text: "Forgot password",
            onPress: () => console.log("Forgot Pressed"),
            style: "cancel"
          } // eslint-disable-line no-console
        ]);
      });
  };

  signup = () => {
    const { view } = this.state;
    const { signup, dispatch, navigation } = this.props;
    this.setState({
      loading: true
    });
    const { email, password, username } = this.state;
    signup({ email, password, username })
      .then(({ data: { signup: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false
        });
        navigation.navigate("Login");
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        Alert.alert(
          `${capitalizeFirstLetter(view)} error`,
          error.message,
          [{ text: "OK", onPress: () => console.log("OK pressed") }] // eslint-disable-line no-console
        );
      });
  };

  switchView = () => {
    const { view } = this.state;
    this.setState({
      view: view === "signup" ? "login" : "signup"
    });
  };

  logout() {
    const { navigation, dispatch } = this.props;
    dispatch(logout());
    navigation.navigate('Auth');
  }

  render() {
    const { view, loading } = this.state;
    const jwt = R.path(["auth", "jwt"], this.props);

    return (
      <KeyboardAvoidingView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          undefined
        )}
        <View style={styles.inputContainer}>
          <Image
            style={styles.logo}
            source={require("../../images/logo.png")}
          />
          <TextInput
            defaultValue="kk@kk.es"
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            defaultValue="popo"
            onChangeText={username => this.setState({ username })}
            placeholder="username"
            style={styles.input}
          />
          <TextInput
            defaultValue="123"
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Button title="Logout" onPress={this.logout} />
        <Button
          onPress={this[view]}
          style={styles.submit}
          title={view === "signup" ? "Sign up" : "Login"}
          disabled={loading || !!jwt}
        />
        <View style={styles.switchContainer}>
          <Text>
            {view === "signup" ? "Already have an account?" : "Join us"}
          </Text>
          <TouchableOpacity onPress={this.switchView}>
            <Text style={styles.switchAction}>
              {view === "login" ? "Sign up" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
Signin.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }),
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    jwt: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

const login = graphql(LOG_USER, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { email, password }
      })
  })
});

const signup = graphql(NEW_USER, {
  props: ({ mutate }) => ({
    signup: user =>
      mutate({
        variables: user
      })
  })
});

const mapStateToProps = ({ auth }) => ({
  auth
});

export default compose(
  login,
  signup,
  connect(mapStateToProps)
)(Signin);
