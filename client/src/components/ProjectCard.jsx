import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProjectCard({project}) {
    console.log(project)
  return (
    <Card style={{ width: '18rem',marginBottom:"10px" }}>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Status : {project.status}</Card.Subtitle>
        <Link to={`/projects/${project.id}`}>View</Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;