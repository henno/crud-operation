import axios from "axios";
import {Client} from '@stomp/stompjs';
import React from "react";
import Logs from "./Logs";
import UserFormModal from "./UserFormModal";
import HandleError from "./HandleError";


class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.deleteUsers = this.deleteUsers.bind(this);
        this.editUsers = this.editUsers.bind(this);
        this.addUsers = this.addUsers.bind(this);
        this.getData = this.getData.bind(this);

    }

    addUsers(user) {this.setState({users: this.state.users.concat(user)})}

    editUsers(user) {this.setState({users: this.state.users.map((users) => users.id === user.id ? user : users)})}

    deleteUsers(id) {this.setState({users: this.state.users.filter(user => user.id !== id)});}

    getData(Data) {this.setState({users: Data.users})}

    WebSocketsLogic() {
        const SOCKET_URL = 'ws://localhost:8080/ws-message';
        let onConnected = () => {
            console.log("Connected!! ")
            client.subscribe('/topic/get', (msg) => {
                if (msg.body) {
                    var Data = JSON.parse(msg.body);
                    this.getData(Data)
                }
            });
            client.subscribe('/topic/post', (msg) => {
                if (msg.body) {
                    var newUser = JSON.parse(msg.body);
                    this.addUsers(newUser)
                }
            });

            client.subscribe('/topic/delete', (msg) => {
                if (msg.body) {
                    var id = JSON.parse(msg.body)
                    this.deleteUsers(id)
                }
            });

            client.subscribe('/topic/update', (msg) => {
                if (msg.body) {
                    var updatedUser = JSON.parse(msg.body)[0];
                    this.editUsers(updatedUser)
                }
            });

        }
        let onDisconnected = () => {
            console.log("disconnected")
        }
        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });
        client.activate();
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users", {
            auth: {
                username: process.env.REACT_APP_AUTHENTICATION_USERNAME,
                password: process.env.REACT_APP_AUTHENTICATION_PASSWORD}})
            .then(response => {
                this.setState({users: response.data})
                localStorage.setItem('users', JSON.stringify(response.data));
            }).catch(error => {
                HandleError(error)
        })
        this.WebSocketsLogic()
    }



    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_API_URL + id, {
            auth: {
                username:process.env.REACT_APP_AUTHENTICATION_USERNAME,
                password:process.env.REACT_APP_AUTHENTICATION_PASSWORD
            }
        }).catch(error => {
            HandleError(error.response.status)})
    }

    render() {
        return (
            <div className="container">
                <h1>Manage users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>username</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className="d-flex justify-content-end"><UserFormModal user={user} editUsers={this.editUsers}></UserFormModal>
                                <button className="remove btn btn-danger btn-sm  ms-3" onClick={() => {
                                    this.handleDelete(user.id)
                                }}>Remove
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <UserFormModal users={this.state.users} username={this.state.user} addUsers={this.addUsers}/>
                <Logs/>
            </div>
        );
    }
}

export default Users;
