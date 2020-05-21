import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Todo from './todo-item.component';

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
            // Attempt to limit the amount of state updates
            // by not updating the state if the new data is
            // exactly the same as the old data within the state.
            if (this.state.todos.length === response.data.length) {
                if (JSON.stringify(this.state.todos) !== JSON.stringify(response.data)) {
                    this.setState({todos: response.data});
                }
            } else {
                this.setState({todos: response.data});
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    todoList() {
        // Set the callback function when the todo item is being removed
        const onRemoveCallback = this.updateStateFromServer;
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} onRemoval={onRemoveCallback}/>;
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