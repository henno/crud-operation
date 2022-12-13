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


    function updateUser() {
        const api = props.api + "/" + props.user.id
        let updatedPost = { ...state };
        updatedPost.id = props.user.id
        updatedPost.name = !!state.name ? state.name : props.user.name
        updatedPost.username = !!state.username ? state.username : props.user.username
        updatedPost.email = !!state.email ? state.email : props.user.email
        axios.put(api, updatedPost, {auth: {
                username: props.username,
                password: props.pass}}
        ).then(r => {
        })
        .catch(error => {
            if (error.response.status === 429) {
                alert("Too many requests!!");
            }
            if (error.response.status === 403) {
                alert("Forbidden");
            };
        })
    }

    function saveUser() {
        const api = props.api
        state.id = props.users.length+1
        axios.post(api,state,  {auth: {
                username: props.username,
                password: props.pass
            }
        }).then(r => {

        })
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if(props.user)  {
        return (
            <>
                <Button className="btn btn-dark btn-sm" onClick={handleShow}>
                    Edit User
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>edit user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control"  name="name" onChange={handleChange}
                               value={state.name} placeholder={props.user.name} id="name"></input>
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" name="username" onChange={handleChange}
                               value={state.username}  placeholder={props.user.username} id="username"></input>
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                               value={state.email}  id="email"
                               placeholder={props.user.email}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button  type="submit" className="update btn btn-primary" variant="primary" onClick={updateUser}>
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
                <Button className="btn btn-dark btn-sm" variant="primary" onClick={handleShow}>
                    Add NEW USER
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" name="name" onChange={handleChange}
                                id="name"
                               placeholder="name"></input>
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" name="username" onChange={handleChange}
                               id="username"
                               placeholder="username"></input>
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                               id="email"
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
