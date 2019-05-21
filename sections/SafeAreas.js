import * as React from 'react';
import {
  Button,
  SafeAreaView as CoreSafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ScrollView,
  SafeAreaView,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ paddingHorizontal: 8 }}>
          Hello! This text is on the Home screen! Be careful now that it doesn't
          appear under the home indicator in landscape! It can happen on either
          side, depending on the orientation.
        </Text>
        <Button
          title="Open info modal"
          onPress={() => this.props.navigation.navigate('Info')}
        />
      </View>
    );
  }
}

class Other extends React.Component {
  static navigationOptions = {
    title: 'Other',
  };

  render() {
    let WrapperView = View;
    // let WrapperView = SafeAreaView;
    // let RowView = View;
    let RowView = SafeAreaView;

    return (
      <ScrollView style={{ flex: 1 }}>
        <WrapperView style={{ flex: 1 }} forceInset={{ vertical: 'never' }}>
          <RectButton style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <RowView style={styles.row} forceInset={{ vertical: 'never' }}>
              <Text>Hello! This text is in a row! So fancy</Text>
            </RowView>
          </RectButton>

          <RectButton style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <RowView style={styles.row} forceInset={{ vertical: 'never' }}>
              <Text>Hello! What will happen here!</Text>
            </RowView>
          </RectButton>
        </WrapperView>
      </ScrollView>
    );
  }
}

let HomeStack = createStackNavigator(
  { Home },
  {
    navigationOptions: {
      title: 'Home',
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

class Info extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Text
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          This is a modal!
        </Text>
        <Text style={{ padding: 20 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Button
          title="Close it"
          onPress={() => this.props.navigation.goBack()}
        />
      </SafeAreaView>
    );
  }
}

let OtherStack = createStackNavigator(
  { Other },

  {
    navigationOptions: {
      title: 'Other',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons color={tintColor} name="ampersand" size={25} />
      ),
    },
  }
);

let Tabs = createBottomTabNavigator({
  HomeStack,
  OtherStack,
});

let RootStack = createStackNavigator(
  {
    Tabs,
    Info,
  },
  {
    initialRouteName: 'Tabs',
    headerMode: 'none',
    mode: 'modal',
  }
);

export default createAppContainer(RootStack);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
