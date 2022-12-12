import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Example from "./adduser";
import session from "sockjs-client/lib/transport/receiver/jsonp";


function Logs() {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        handleGET();
    }, []);

    const handleGET = () => {
                axios.get("http://localhost:8080/logs", {auth: {
                username: "user1",
                password: "password"}} )
            .then(response => {
                setLogs(logs.concat(response.data));
                console.log(response.data)
            })

    }
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }






    return (

        <>
            <Button  className="mx-2 btn btn-info btn-sm" onClick={() => handleShow(true)}>
                Logs
            </Button>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rest api logging</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>ID</th>
                            <th>Request Body</th>
                            <th>Old Info</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.slice(-20).map((logs, index) =>
                            <tr key={index}>
                                <td>{logs.date}</td>
                                <td>{logs.method}</td>
                                <td>{logs.endpoint}</td>
                                <td>{logs.id}</td>
                                <td>
                                    {
                                        logs.body.name ? <p>name: {logs.body.name}</p> : <p></p>
                                    }
                                    {
                                        logs.body.username ? <p>username: {logs.body.username}</p> : <p></p>
                                    }
                                    {
                                        logs.body.email ? <p>email: {logs.body.email}</p> : <p></p>
                                    }
                                </td>
                                <td>
                                    {
                                        logs.oldBody.name ? <p>name: {logs.oldBody.name}</p> : <p></p>
                                    }
                                    {
                                        logs.oldBody.username ? <p>username: {logs.oldBody.username}</p> : <p></p>
                                    }
                                    {
                                        logs.oldBody.email ? <p>email: {logs.oldBody.email}</p> : <p></p>
                                    }
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Logs;

