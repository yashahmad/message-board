import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useMessageContext } from '../context/MessageContext';

const DeleteAlert = (props) => {
    const { dispatch } = useMessageContext();

    const handleDelete = async (id) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = process.env.REACT_APP_AUTH_TOKEN;
        await fetch(`${apiUrl}${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            },
        });
        dispatch({ type: 'DELETE_MESSAGE', payload: id })
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ color: '#dc3545' }}
        >
            <Modal.Body style={{ backgroundColor: '#f8d7da' }}>
                <h4>Are you sure you want to delete this message ? {props.data}</h4>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f8d7da' }}>
                <Button variant="danger" onClick={() => handleDelete(props.data)}>Delete</Button>
                <Button variant="success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAlert;