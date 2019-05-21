import * as React from 'react';
import {
  Button,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  createAppContainer,
  createBottomTabNavigator,
  withNavigationFocus,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import words from '../words';

class ScreenA extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor, horizontal }) => (
      <Ionicons name="ios-walk" size={horizontal ? 20 : 25} color={tintColor} />
    ),
    tabBarLabel: 'Walk',
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <SafeAreaView /* currently doesn't handle notch on android! */>
          <TextInput
            placeholder="Enter text here"
            style={{
              height: 50,
              width: 200,
              borderWidth: 1,
              borderColor: '#eee',
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#fff',
              borderRadius: 5,
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor, horizontal }) => (
      <Ionicons
        name="ios-bicycle"
        size={horizontal ? 20 : 25}
        color={tintColor}
      />
    ),
    tabBarLabel: 'Bicycle',
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>Screen B</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

let Tabs = createBottomTabNavigator(
  {
    A: ScreenA,
    B: ScreenB,
  },
  {
    defaultNavigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarOptions: {
        keyboardHidesTabBar: true,
      },
    },
  }
);

export default createAppContainer(Tabs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 15,
  },
  paragraph: {
    marginBottom: 10,
  },
});
