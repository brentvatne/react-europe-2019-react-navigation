import * as React from 'react';
import {
  Alert,
  Button,
  TextInput,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  Header,
  NavigationActions,
  HeaderBackButton,
} from 'react-navigation';
import { SwitchActions } from '@react-navigation/core';

class ScreenA extends React.Component {
  static navigationOptions = {
    title: 'A',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen A</Text>
        <Button
          title="Navigate to Screen B"
          onPress={() => this.props.navigation.navigate('B')}
        />
      </View>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // If for some reason we put ScreenB as the first screen in the stack we
    // don't want to show the header button! We don't really care about this right
    // now but it's useful when you want to add back buttons through defaultNavigationOptions
    if (!navigation.isFirstRouteInParent()) {
      let backIsDisabled = navigation.getParam('backIsDisabled');
      return {
        title: 'B',
        gesturesEnabled: !backIsDisabled,
        headerLeft: props => (
          <HeaderBackButton {...props} disabled={backIsDisabled} />
        ),
      };
    }
  };

  _handleTextChange = text => {
    this.setState({ text });
    if (text.length === 0) {
      this.props.navigation.setParams({ backIsDisabled: false });
    } else {
      if (!this.props.navigation.getParam('backIsDisabled')) {
        this.props.navigation.setParams({ backIsDisabled: true });
      }
    }
  };

  render() {
    let backIsDisabled = this.props.navigation.getParam('backIsDisabled');

    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          onChangeText={this._handleTextChange}
          style={styles.input}
          placeholder="Enter some text"
        />
      </View>
    );
  }
}

let Stack = createStackNavigator(
  {
    A: ScreenA,
    B: {
      screen: ScreenB,
      params: {
        backIsDisabled: false,
      },
    },
  },
  {
    initialRouteName: 'A',
  }
);
let Tabs = createBottomTabNavigator({
  Stack1: Stack,
  Stack2: Stack,
});

let AppContainer = createAppContainer(Tabs);

// The ref from the app container so we can dispatch actions
// from anywhere
let GlobalNavigation = null;
function setGlobalNavigation(navigation) {
  GlobalNavigation = navigation;
}

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigation => setGlobalNavigation(navigation)}
        onNavigationStateChange={state => console.log(state)}
      />
    );
  }
}

/* Block back actions when applicable */

let originalGetStateForAction = Stack.router.getStateForAction;
Stack.router.getStateForAction = (action, state) => {
  let nextState = originalGetStateForAction(action, state);

  // You can check if the next state changes the active index.
  // This seems like something you might want to do
  if (state && nextState.index !== state.index) {
    let activeIndex = state.index;
    let activeRoute = state.routes[activeIndex];
    if (activeRoute.params && activeRoute.params.backIsDisabled) {
      maybeBlockRouteChange(activeRoute, action.key);
      return null;
    }
  }

  return nextState;
};

// TODO:
// Make another example with multi-step and another with just simple lock out of back mechanism
function maybeBlockRouteChange(state, key = state.key) {
  let params = state.params || {};
  let { backIsDisabled } = params;
  if (!GlobalNavigation) {
    return;
  }

  if (backIsDisabled) {
    Alert.alert(
      'Discard changes?',
      'You will lose changes if you go back now',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => {
            GlobalNavigation.dispatch(
              NavigationActions.setParams({
                key: state.key,
                params: { backIsDisabled: false },
              })
            );
            GlobalNavigation.dispatch(NavigationActions.back(state.key));
          },
        },
      ]
    );
  } else {
    GlobalNavigation.dispatch(NavigationActions.back(state.key));
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  input: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    borderRadius: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
