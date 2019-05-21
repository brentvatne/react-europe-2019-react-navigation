import React from 'react';
import {
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
import { Linking } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Placeholder extends React.Component {
  static navigationOptions = {
    title: 'Untitled',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.routeName}</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.routeName}</Text>
        <Button
          title="Go to settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = { title: 'Settings' };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.routeName}</Text>
        <Text>
          {this.props.navigation.getParam('section', 'no section focused')}
        </Text>
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
  {
    Profile: {
      screen: ProfileScreen,
      path: '',
    },
    Settings: {
      screen: SettingsScreen,
      path: 'settings/:section',
    },
  },
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
  Home: {
    screen: Home,
    path: 'home',
  },
  Search: {
    screen: Search,
    path: 'search',
  },
  Profile: {
    screen: Profile,
    path: 'profile',
  },
});

const Navigation = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <Navigation enableURLHandling={true} uriPrefix={Linking.makeUrl('/')} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
