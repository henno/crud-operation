import axios from "axios";
import Example from "./adduser";
import { Client } from '@stomp/stompjs';
import React from "react";
import Logs from "./Logs";


class Users extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            api: process.env.REACT_APP_API_URL,
            user: process.env.REACT_APP_AUTHENTICATION_USERNAME,
            pass: process.env.REACT_APP_AUTHENTICATION_PASSWORD
        }
        this.deleteUsers = this.deleteUsers.bind(this);
        this.editUsers = this.editUsers.bind(this);
        this.addUsers = this.addUsers.bind(this);
        this.andmed = this.andmed.bind(this)

    }

    componentDidMount(){
        axios.get("http://localhost:8080/users", {auth: {
                username:this.state.user,
                password: this.state.pass}} )
            .then(response => {
                this.setState({users: response.data})
                localStorage.setItem('users', JSON.stringify(response.data));
            })

            .catch(error => {
                console.log(localStorage.getItem('users'))
                this.setState({users:JSON.parse(localStorage.getItem('users') || "")});
                console.log('request failed', error);
                return error;
            })
        this.andmed()
    }

    addUsers(user) {
        this.setState({users: this.state.users.concat(user) })
    }


    andmed() {
        const SOCKET_URL = 'ws://localhost:8080/ws-message';
        let onConnected = () => {
            console.log("Connected!! ")
            client.subscribe('/topic/get', (msg) => {
                if (msg.body) {
                    var jsonBody = JSON.parse(msg.body);
                    this.setState({users: jsonBody.users})
                }
            });

            client.subscribe('/topic/post', (msg) => {
                if (msg.body) {
                    var jsonBody = JSON.parse(msg.body);
                    this.setState({users: this.state.users.concat(jsonBody) })

                }
            });

            client.subscribe('/topic/delete', (msg) => {
                if (msg.body) {
                    var id = JSON.parse(msg.body)
                    this.setState({users: this.state.users.filter(user => user.id !== id)});

                }
            });

            client.subscribe('/topic/update', (msg) => {
                if (msg.body) {
                    console.log(msg.body)
                    var jsonBody = JSON.parse(msg.body)[0];
                    this.setState({users: this.state.users.map((users) => users.id === jsonBody.id ? jsonBody : users)})

                }
            });

        }
        let onDisconnected = () => {
            console.log("Disconnected!!")
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
    editUsers(user) {
        this.setState({users: this.state.users.map((users) => users.id === user.id ? user : users)})
    }

    deleteUsers(id){
        const api = this.state.api
        console.log(this.state.user)
        axios.delete(api + "/" + id, {auth: {
                username: this.state.user,
                password: this.state.pass
            },
        mode: "no-cors"}).then( res => {
            console.log(res.data)
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        }).catch(error => {
            if (error.response.status === 429) {
                alert("Too many requests!!");
            }
            if (error.response.status === 403) {
                alert("Forbidden");
            };
        })
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
                            <td className="d-flex justify-content-end" ><Example user={user} users={this.state.users}  pass={this.state.pass} username={this.state.user} api={this.state.api} editUsers={this.editUsers} ></Example>
                                <button className="remove btn btn-danger btn-sm  ms-3"  onClick={ () => this.deleteUsers(user.id)}>Remove</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Example  users={this.state.users}  api={this.state.api} pass={this.state.pass} username={this.state.user} addUsers={this.addUsers} />
                <Logs />
            </div >
        );
    }
}
export default Users;
