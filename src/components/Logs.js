import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function Logs() {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        handleGET();
    }, []);

    const handleGET = () => {
        axios.get("http://localhost:8080/logs", {
            auth: {
                username: process.env.REACT_APP_AUTHENTICATION_USERNAME,
                password: process.env.REACT_APP_AUTHENTICATION_PASSWORD
            }}).then(response => {setLogs(logs.concat(response.data));})
    }

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            <Button className="mx-2 btn btn-info btn-sm" onClick={() => handleShow(true)}>
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
                            <th>New info</th>
                            <th>Old Info</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.slice(-20).map((log, index) =>
                            <tr key={index}>
                                <td>{log.date}</td>
                                <td>{log.method}</td>
                                <td>{log.endpoint}</td>
                                <td>{log.id}</td>
                                <td>
                                    {log.body && log.body.name ? <p>name: {log.body.name}</p> : <p></p>}
                                    {log.body && log.body.username ? <p>username: {log.body.username}</p> : <p></p>}
                                    {log.body && log.body.email ? <p>email: {log.body.email}</p> : <p></p>}
                                </td>
                                <td>
                                    {log.oldBody && log.oldBody.name ? <p>name: {log.oldBody.name}</p> : <p></p>}
                                    {log.oldBody && log.oldBody.username ? <p>username: {log.oldBody.username}</p> :
                                        <p></p>}
                                    {log.oldBody && log.oldBody.email ? <p>email: {log.oldBody.email}</p> : <p></p>}
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

