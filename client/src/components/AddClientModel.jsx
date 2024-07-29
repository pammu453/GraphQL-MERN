import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {ADD_CLIENT} from '../mutations/clientMutations'
import {useMutation} from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries';

const AddCLientModel = () => {
    const [show, setShow] = useState(false);
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [addClient]=useMutation(ADD_CLIENT,{
        variables: clientData,
        update: (cache, {data: {addClient}}) => {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [addClient,...clients] }
            });
        },
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addClientHandler = () => {
        if(!clientData.name || !clientData.email || !clientData.phone) return alert('Please enter all fields')
        addClient()
        setShow(false);
        setClientData({name: '', email: '', phone: ''});
    }

    return (
        <div className='mb-2'>
            <Button variant="light" onClick={handleShow}>
                Add CLient
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={clientData.name} onChange={(e) => setClientData({ ...clientData, name: e.target.value })} type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={clientData.email} onChange={(e) => setClientData({ ...clientData, email: e.target.value })} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={clientData.phone} onChange={(e) => setClientData({ ...clientData, phone: e.target.value })} type="text" placeholder="Enter phone" required />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='m-3' variant="success" onClick={addClientHandler}>
                            Add CLient
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddCLientModel;