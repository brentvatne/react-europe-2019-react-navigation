import * as React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

let Store = React.createContext(null);

const Todo = props => <Text>{JSON.stringify(props.value)}</Text>;
class TodoListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: () => <TodoTitle />,
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Store.Consumer>
          {({ getState }) =>
            getState().todos.map(todo => <Todo key={todo.name} value={todo} />)
          }
        </Store.Consumer>
        <Button
          title="Go to new todo screen"
          onPress={() => this.props.navigation.navigate('NewTodo')}
        />
      </ScrollView>
    );
  }
}

class NewTodoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: () => <TodoTitle />,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Store.Consumer>
          {({ addTodo }) => (
            <Button
              title="Create one"
              onPress={() =>
                addTodo({
                  name: `new todo at ${new Date()}! + ${Math.random()}`,
                })
              }
            />
          )}
        </Store.Consumer>
      </View>
    );
  }
}

class TodoTitle extends React.Component {
  render() {
    return (
      <Store.Consumer>
        {({ getState }) => <Text>Todos: {getState().todos.length}</Text>}
      </Store.Consumer>
    );
  }
}

let TodosStack = createStackNavigator({
  TodoList: TodoListScreen,
  NewTodo: NewTodoScreen,
});

let Navigation = createAppContainer(TodosStack);

class App extends React.PureComponent {
  render() {
    return <Navigation />;
  }
}

export default class AppContainer extends React.Component {
  state = {
    store: {
      todos: [{ name: 'lol' }],
    },
  };

  _getState = () => this.state.store;
  _addTodo = todo => {
    let { todos } = this.state.store;
    let nextTodos = [todo, ...todos];
    let store = {
      ...store,
      todos: nextTodos,
    };
    this.setState({ store });
  };

  render() {
    return (
      <Store.Provider
        value={{ getState: this._getState, addTodo: this._addTodo }}>
        <App />
      </Store.Provider>
    );
  }
}
