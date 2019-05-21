import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const USER_KEY = '@storage/user';

class Placeholder extends React.Component {
  static navigationOptions = {
    title: 'Untitled',
  };

  _signOutAsync = async () => {
    this.props.navigation.navigate('Authentication');
    await AsyncStorage.clear();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.routeName}</Text>
        <Button title="Sign out" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const Home = createStackNavigator(
  { Home: Placeholder },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="home-circle"
          size={25}
        />
      ),
    },
  }
);
const Search = createStackNavigator(
  { Search: Placeholder },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="database-search"
          size={25}
        />
      ),
    },
  }
);
const Profile = createStackNavigator(
  { Profile: Placeholder },
  {
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="face-profile"
          size={25}
        />
      ),
    }),
  }
);

const Tabs = createBottomTabNavigator({
  Home,
  Search,
  Profile,
});

class LoadingScreen extends React.Component {
  componentDidMount() {
    this._loadUserAsync();
  }

  _loadUserAsync = async () => {
    let user;
    try {
      let stored = await AsyncStorage.getItem(USER_KEY);
      user = JSON.parse(stored);
    } catch (e) {
      console.log(e);
    }

    if (user) {
      // if the user is found, go to tabs
      this.props.navigation.navigate('Tabs');
    } else {
      // otherwise force sign in
      this.props.navigation.navigate('Authentication');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

class AuthenticationScreen extends React.Component {
  _signInAsync = async () => {
    try {
      let user = { name: 'Brent', userId: 123, token: 'abc' };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

      // probably you also want to store the user in redux or some state management
      // tool so you can access it elsewhere in your app without having to fetch
      // from asyncstorage!

      this.props.navigation.navigate('Tabs');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Log in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

const RootSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Authentication: AuthenticationScreen,
    Tabs,
  },
  {
    initialRouteName: 'Loading',
  }
);

export default createAppContainer(RootSwitch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
