import React,{ Component } from 'react';

import {
  StackActions,
  NavigationActions,
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
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
import NewArticle from './screens/NewArticle';
import UserArticles from './screens/userArticles.screen';


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
const MyStoreNavigate = createMaterialTopTabNavigator({
  Store: { screen: Articles},
  MyStore: { screen: UserArticles },
},
{
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: '#aaaaaa',
    labelStyle: {
        fontSize: 15,
    },
    indicatorStyle: {
      borderBottomColor: 'red',
      borderBottomWidth: 1,
    },
    tabStyle: {
        indicatorStyle: 'red',
    },
    style: {
        backgroundColor: '#e3e8ef',
        height: 50,
    },
  },
  initialRouteName: 'Store',
},
);

const MainScreenNavigator = createBottomTabNavigator(
  {
    Buscador: {screen: MyStoreNavigate,
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
        
      },
      tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: '#02c8ef'
      }
      }
);
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainScreenNavigator },
    Messages: { screen: Messages, 
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#02c8ef',
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
          backgroundColor: '#02c8ef',
          height: 50,
        },
        headerTitleStyle: {

        },
        headerTintColor: '#fff',
        title: 'Producto',
      },
    },
    NewArticle: { screen: NewArticle,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#02c8ef',
          height: 50,
        },
        headerTitleStyle: {

        },
        headerTintColor: '#fff',
        title: 'Vendiendo',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#02c8ef',
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