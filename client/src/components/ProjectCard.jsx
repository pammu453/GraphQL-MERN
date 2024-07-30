import Card from 'react-bootstrap/Card';

function ProjectCard({project}) {
    console.log(project)
  return (
    <Card style={{ width: '18rem',marginBottom:"10px" }}>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Status : {project.status}</Card.Subtitle>
        <Card.Link href={`/projects/${project.id}`}>View</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;