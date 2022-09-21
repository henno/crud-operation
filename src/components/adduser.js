import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add NEW USER
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} value={state.name} id="name"
                           placeholder="Example input"></input>
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" name="username" onChange={handleChange} value={state.username} id="username"
                           placeholder="Another input"></input>
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" name="email" onChange={handleChange} value={state.email} id="email"
                           placeholder="Another input"></input>
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
export default Example;
