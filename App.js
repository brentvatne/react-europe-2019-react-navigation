import React from 'react';
import { StatusBar, StyleSheet, Platform, Text, View } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import * as Sections from './sections';
import { useScreens } from 'react-native-screens';
import { Assets as StackAssets } from 'react-navigation-stack';
import { Constants, Asset } from 'expo';

// Go here! vvv
// https://www.codecast.io/play_cast/ekEN59en5yo6
// Go here! ^^^

// Switch the value to turn the deep linking example on/off
const USE_DEEP_LINKING_EXAMPLE = false;

// Grab some assets they are cached on disk to load more quickly in development
// after first load
Asset.fromModule(require('./assets/waterfall.jpg')).downloadAsync();
Asset.loadAsync(StackAssets);

// Account for status bar being opaque if necessary
if (Platform.OS === 'android') {
  if (Constants.manifest.androidStatusBar) {
    SafeAreaView.setStatusBarHeight(0);
  }
}

// You can uncomment the following line to use better native primitives for
// screens! It is still in alpha, but for most cases it will work well:
// useScreens();

class Button extends React.Component {
  render() {
    return (
      <RectButton
        style={{
          backgroundColor: '#eee',
          borderRadius: 5,
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          paddingVertical: 10,
          marginHorizontal: 20,
        }}
        onPress={this.props.onPress}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>
          {this.props.title}
        </Text>
      </RectButton>
    );
  }
}

class App extends React.Component {
  state = {
    activeSection: null,
  };

  render() {
    if (this.state.activeSection) {
      let Section = Sections[this.state.activeSection];
      return <Section />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 20,
            fontWeight: '600',
            fontSize: 35,
            textAlign: 'left',
          }}>
          Navigation
        </Text>

        <Button
          title="Stack basics"
          onPress={() => this.setState({ activeSection: 'Stack' })}
        />

        <Button
          title="Search layout"
          onPress={() => this.setState({ activeSection: 'Search' })}
        />

        <Button
          title="Safe areas"
          onPress={() => this.setState({ activeSection: 'SafeAreas' })}
        />

        <Button
          title="Bottom tabs"
          onPress={() => this.setState({ activeSection: 'BottomTabs' })}
        />

        <Button
          title="Nesting navigators"
          onPress={() => this.setState({ activeSection: 'Nesting' })}
        />

        <Button
          title="Material bottom tabs"
          onPress={() => this.setState({ activeSection: 'MaterialBottomTabs' })}
        />

        <Button
          title="Material top tabs"
          onPress={() => this.setState({ activeSection: 'MaterialTopTabs' })}
        />

        <Button
          title="Drawer layout"
          onPress={() => this.setState({ activeSection: 'Drawer' })}
        />

        <Button
          title="Drawer layout (alpha)"
          onPress={() => this.setState({ activeSection: 'ReanimatedDrawer' })}
        />

        <Button
          title="Dynamic tabs detached navigator"
          onPress={() => this.setState({ activeSection: 'DynamicTabs' })}
        />

        <Button
          title="Dynamic tabs with tab view"
          onPress={() => this.setState({ activeSection: 'TabView' })}
        />

        <Button
          title="Authentication"
          onPress={() => this.setState({ activeSection: 'Authentication' })}
        />

        <Button
          title="Preventing actions"
          onPress={() => this.setState({ activeSection: 'PreventingActions' })}
        />

        <Button
          title="Keyboard"
          onPress={() => this.setState({ activeSection: 'Keyboard' })}
        />

        <Button
          title="Themes"
          onPress={() => this.setState({ activeSection: 'Themes' })}
        />

        <Button
          title="Localization"
          onPress={() => this.setState({ activeSection: 'Localization' })}
        />

        <Button
          title="Bottom sheet"
          onPress={() => this.setState({ activeSection: 'BottomSheet' })}
        />

        <Button
          title="Shared element transitions"
          onPress={() => this.setState({ activeSection: 'MagicMove' })}
        />

        <StatusBar hidden={false} barStyle="default" />
      </ScrollView>
    );
  }
}

let AppComponent;
if (USE_DEEP_LINKING_EXAMPLE) {
  AppComponent = Sections.DeepLinking;
} else {
  AppComponent = App;
}
export default AppComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 30,
  },
});
