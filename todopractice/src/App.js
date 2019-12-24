import React from 'react';
import './App.css';
import Todos from './component/Todos';
import Header from "./component/layout/Header";

class App extends React.Component{
    state = {
      todos: [
          {
              id: 1,
              title: 'Title1',
              completed: false
          },
          {
              id: 2,
              title: 'Title2',
              completed: false
          },
          {
              id: 3,
              title: 'Title3',
              completed: true
          },
      ]
    };
    markedToggle = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        })
    };
    deleteTodo = (id) => {
        /*this.state.todos.splice(id - 1, 1);
        this.setState({
            todos: this.state.todos
        });*/
        this.setState({
            todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
    };
    render() {
        return (
            <div className="App">
                <Header/>
                <Todos todos={this.state.todos}
                       markedToggle={this.markedToggle}
                       deleteTodo={this.deleteTodo}
                />
            </div>
        );
    }
}

export default App;
