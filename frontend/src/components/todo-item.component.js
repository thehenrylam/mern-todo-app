import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Todo extends Component {

    onRemoveTodo(todoId) {
        axios.post('http://localhost:4000/todos/remove/' + todoId)
            .catch(function(err) {
                console.log(err);
            });
        this.props.onRemoval();
    }

    render() {
        const todo = this.props.todo;
        return (
            <tr>
                <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_description}</td>
                <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_responsible}</td>
                <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_priority}</td>
                <td>
                    <Link to={"/edit/" + todo._id}>Edit</Link>
                    <span style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>|</span>
                    <a href="#" onClick={this.onRemoveTodo.bind(this, todo._id)}>Remove</a>
                </td>
            </tr>
        );
    }
}