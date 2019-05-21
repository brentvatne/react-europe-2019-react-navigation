import * as React from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation';
import { StackViewStyleInterpolator as StyleInterpolator } from 'react-navigation-stack';
import * as MagicMove from 'react-native-magic-move';
import 'react-navigation-magic-move';
import * as Animatable from 'react-native-animatable';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  renderImageItem({ id, source, onPress }) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={styles.box}>
          <MagicMove.Image
            id={id}
            source={source}
            resizeMode="cover"
            style={[styles.box, StyleSheet.absoluteFill]}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <MagicMove.Scene style={styles.container}>
        <View style={styles.row}>
          {this.renderImageItem({
            id: 'image',
            source: require('../assets/waterfall.jpg'),
            onPress: () => this.props.navigation.navigate('Scene'),
          })}
        </View>
      </MagicMove.Scene>
    );
  }
}

class Scene extends React.Component {
  static navigationOptions = {
    title: 'Scene',
  };

  render() {
    return (
      <MagicMove.Scene style={sceneStyles.container}>
        <ScrollView style={sceneStyles.container}>
          <MagicMove.Image
            id="image"
            style={sceneStyles.image}
            source={require('../assets/waterfall.jpg')}
            resizeMode="cover"
            easing={Easing.in(Easing.cubic)}
            duration={400}
          />
          <Animatable.Text
            style={sceneStyles.text}
            animation="fadeInUp"
            delay={400}
            duration={500}>
            Images are animated seamlessly to reveal the full content, without
            any stretching or tearing
          </Animatable.Text>
        </ScrollView>
      </MagicMove.Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  box: {
    width: 140,
    height: 140,
    borderRadius: 70,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

const sceneStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.65,
  },
  text: {
    margin: 20,
    fontSize: 19,
    letterSpacing: 1,
    lineHeight: 32,
  },
  signature: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 20,
  },
});

let Stack = createStackNavigator(
  { Main, Scene },
  {
    defaultNavigationOptions: {
      // This looks a lot better with Android transitions
      ...Platform.select({
        android: {
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            elevation: 0,
          },
        },
      }),
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.in(Easing.poly(5)),
        timing: Animated.timing,
      },
      screenInterpolator: StyleInterpolator.forFade,
    }),
  }
);
let Navigation = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return (
      <MagicMove.Provider>
        <Navigation />
      </MagicMove.Provider>
    );
  }
}
