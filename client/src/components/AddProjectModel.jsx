import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ADD_PROJECT } from '../mutations/projectMurtations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries'

const AddProjectModel = () => {
    const [show, setShow] = useState(false);
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        status: "",
        clientId: ""
    });

    const { loading, error, data } = useQuery(GET_CLIENTS)
    console.log(data)

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: projectData,
        update: (cache, { data: { addProject } }) => {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [addProject, ...projects] }
            });
        },
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addProjectHandler = () => {
        if (!projectData.name || !projectData.description || !projectData.status) return alert('Please enter all fields')
        addProject()
        console.log(projectData)
        setShow(false);
    }

    if (loading) return null;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className='mb-2'>
            {
                !loading && !error && <>
                    <Button variant="light" onClick={handleShow}>
                        Add Project
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={projectData.name} onChange={(e) => setProjectData({ ...projectData, name: e.target.value })} type="text" placeholder="Enter name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} type="text" placeholder="Enter description" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Status of the project</Form.Label>
                                    <Form.Select aria-label="Default select example" value={projectData.status} onChange={(e) => setProjectData({ ...projectData, status: e.target.value })}>
                                        <option>Select status of project</option>
                                        <option value="NOT_STARTED">Not started</option>
                                        <option value="IN_PROGRESS">In progress</option>
                                        <option value="COMPLETED">Completed</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="clients">
                                    <Form.Label>Clients</Form.Label>
                                    <Form.Select aria-label="Default select example" value={projectData.clientId} onChange={(e) => setProjectData({ ...projectData, clientId: e.target.value })}>
                                        <option>Select client for project</option>
                                        {
                                            data.clients.map(client => {
                                                return <option key={client.id} value={client.id}>{client.email}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className='m-3' variant="success" onClick={addProjectHandler}>
                                    Add Project
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            }
        </div>
    );
}

export default AddProjectModel;