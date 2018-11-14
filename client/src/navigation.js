import React,{ Component } from 'react';

import {
  StackActions,
  NavigationActions,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Text, View, StyleSheet,BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Articles from './screens/articles.screen';
import InfoArticles from './screens/infoArticle.screen';
import Chats from './screens/chats.screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Messages from './screens/messages.screen';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);
// tabs in main screen
const MainScreenNavigator = createBottomTabNavigator(
  {
    Buscador: {screen: Articles,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-search" color={tintColor} size={24} />
      )
    }
  },
    Settings: { screen: TestScreen('Settingea algo pisha'),
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    }
  },
  Messeges: { screen: Chats,
  navigationOptions: {
    tabBarLabel: 'Messeges',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-mail" color={tintColor} size={24} />
    )
  }
},
  
  }, // fuera de mainscreen
  {
    initialRouteName: 'Buscador',
    order: ['Messeges','Buscador', 'Settings'],
    navigationOptions: {
        tabBarVisible: true
      },
      tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: '#4b6fe5'
      }
      }
);
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainScreenNavigator },
    Messages: { screen: Messages, 
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#4b6fe5',
          height: 50,
        },
        headerTitleStyle: {

        },
        headerTintColor: '#fff',
        title: 'Producto',
      },
     },
    InfoArticles: { screen: InfoArticles,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#4b6fe5',
          height: 50,
        },
        headerTitleStyle: {

        },
        headerTintColor: '#fff',
        title: 'Producto',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#4b6fe5',
        height: 50,
      },
      headerTitleStyle: {
        marginHorizontal: 150,
      },
      headerTintColor: '#fff',
      title: 'Wally',
    },
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

class AppWithBackPress extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return <App {...this.props} />;
  }
}
const AppWithNavigationState = connect(mapStateToProps)(AppWithBackPress);
export default AppWithNavigationState;