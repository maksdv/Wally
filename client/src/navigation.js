import React, { Component, Image } from 'react';

import {
  StackActions,
  NavigationActions,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Articles from './screens/articles.screen';
import InfoArticles from './screens/infoArticle.screen';
import Chats from './screens/chats.screen';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

const Prueba = () => <Image source="./media/tapusguapus.jpg" style={{ width: 30, height: 30 }} />;

class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'mecagoendios',
    tabBarIcon: <Image source="./media/tapusguapus.jpg" style={{ width: 30, height: 30 }} />,
  };

  render = () => <View />;
}

const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);
// tabs in main screen
const MainScreenNavigator = createMaterialTopTabNavigator(
  {
    Rayitas: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'mecagoendios',
        tabBarIcon: <Image source="./media/tapusguapus.jpg" style={{ width: 30, height: 30 }} />,
        tabBarColor: '#ffff',
      },
    },
    Buscador: { screen: Articles },
    Chats: { screen: Chats },
    Settings: { screen: InfoArticles },
  },
  {
    initialRouteName: 'Buscador',
  },
);
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainScreenNavigator },
    InfoArticles: { screen: InfoArticles },
  },
  {
    headerMode: 'none',
  },
);
// reducer initialization code
const initialState = AppNavigator.router.getStateForAction(
  StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    ],
  }),
);
export const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
