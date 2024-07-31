import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectModel from '../components/EditProjectModal';

const ProjectDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="my-4">
            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Status: {project.status}</Card.Subtitle>
              <Card.Text>{project.description}</Card.Text>
              <Card.Title>Client Details</Card.Title>
              <Card.Text><strong>ID:</strong> {project.client.id}</Card.Text>
              <Card.Text><strong>Name:</strong> {project.client.name}</Card.Text>
              <Card.Text><strong>Email:</strong> {project.client.email}</Card.Text>
              <Card.Text><strong>Phone:</strong> {project.client.phone}</Card.Text>
              <Link to="/">
                <Button className='bg-secondary dannger'>
                  Go back
                </Button>
              </Link>
              <DeleteProjectButton projectId={id} />
              <EditProjectModel project={project} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetail;
