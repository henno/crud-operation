import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import usePlaceholder from "react-bootstrap/usePlaceholder";

function Example(props) {
    const [show, setShow] = useState(false);
    const [state, setState] = React.useState({
        id: 0,
        name: "",
        username: "",
        email: ""
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function saveUser() {
        const api = 'https://jsonplaceholder.typicode.com/users'
        state.id = props.posts.length+1;
        axios.post(api,state).then(() => {
            props.setPosts([state,...props.posts]);
        })
    }

    function updateUser() {
        const api = 'https://jsonplaceholder.typicode.com/users/' + props.post.id
        let updatedPost = props.post
        updatedPost.name = state.name
        updatedPost.username = state.username
        updatedPost.email = state.email
        axios.put(api, updatedPost).then(() => {
            props.setPosts([...props.posts]);
        })
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if(props.post)  {
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Edit User
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>edit user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control"  name="name" onChange={handleChange}
                               value={state.name} placeholder={props.post.name} id="name"></input>
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" name="username" onChange={handleChange}
                               value={state.username}  placeholder={props.post.username} id="username"
                               placeholder={props.post.username}></input>
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                               value={state.email}  id="email"
                               placeholder={props.post.email}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" class="update" variant="primary" onClick={updateUser}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    else{
        return (
            <>
                <Button class="adduser" variant="primary" onClick={handleShow}>
                    Add NEW USER
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" name="name" onChange={handleChange}
                               value={state.name} id="name"
                               placeholder="name"></input>
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" name="username" onChange={handleChange}
                               value={state.username} id="username"
                               placeholder="username"></input>
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                               value={state.email} id="email"
                               placeholder="email"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={saveUser}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default Example;
