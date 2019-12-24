import React from 'react';

class TodoItems extends React.Component{
    getStyle = () => {
      return {
          background: '#f4f4f4',
          padding: '10px',
          borderBottom: '1px #ccc dotted',
          textDecoration: (this.props.todo.completed ? 'line-through' : 'none' )
      }
    };
    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                <input type='checkbox' onClick={this.props.markedToggle.bind(this, id)}/>
                {title}
                <button style={this.btnStyle} onClick={this.props.deleteTodo.bind(this, id)}>x</button>
                </p>
            </div>
        );
    }
    btnStyle = {
        background: '#ff0000',
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right'
    }
}

export default TodoItems;
