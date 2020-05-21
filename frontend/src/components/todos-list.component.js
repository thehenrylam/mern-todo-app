import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
            <span style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>|</span>
            <a href="#">Remove</a>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);

        this.updateStateFromServer = this.updateStateFromServer.bind(this);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        this.updateStateFromServer();
    }

    componentDidUpdate() {
        this.updateStateFromServer();
    }

    updateStateFromServer() {
        axios.get('http://localhost:4000/todos/')
        .then(response => {
            if (this.state.todos.length === response.data.length) {
                if (JSON.stringify(this.state.todos) !== JSON.stringify(response.data)) {
                    console.log('update');
                    this.setState({todos: response.data});
                }
            } else {
                console.log('update');
                this.setState({todos: response.data});
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}