import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Example from "./adduser";
import session from "sockjs-client/lib/transport/receiver/jsonp";


function Logs() {
    const originalOpen = XMLHttpRequest.prototype.open;

// Note: You should not use an arrow function here, since you need the "this" value scoped to the XMLHttpRequest object
    XMLHttpRequest.prototype.open = function () {
        console.log(...arguments);
        originalOpen.call(this, ...arguments);
    }
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        handleGET();
    }, []);

    const handleGET = () => {
                axios.get("http://localhost:8080/actuator/httptrace", {auth: {
                username: "user1",
                password: "password"}} )
            .then(response => {
                setLogs(logs.concat(response.data.traces));
                console.log(response.data.traces)
            })

    }
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    return (

        <>
            <Button  className="me-2 mb-2" onClick={() => handleShow(true)}>
                Full screen
            </Button>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.slice(-20).map((logs, index) =>
                            <tr key={index}>
                                <td>{logs.timestamp}</td>
                                <td>{logs.request.method}</td>
                                <td>{logs.request.uri}</td>
                                <td>{}</td>


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

