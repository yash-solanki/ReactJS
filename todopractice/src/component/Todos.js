import React from 'react';
import TodoItems from "./TodoItems";

class Todos extends React.Component{
    render() {
        return this.props.todos.map((todo, i) => (
            <TodoItems key={i} todo={todo}
                       markedToggle={this.props.markedToggle}
                       deleteTodo={this.props.deleteTodo}
            />
            ))
    }
}

export default Todos;
