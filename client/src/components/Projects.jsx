import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import Loader from './Loader'
import ProjectCard from './ProjectCard'

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <Loader />
    if (error) return <p>Error occured</p>

    return (
        <>
            {
                !loading && !error && data.projects.length === 0 ?
                    <p>No clients found. Please add a new client.</p>
                    : data.projects.map((project) => {
                        return (
                            <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
                                <ProjectCard key={project.id} project={project} />
                            </div>
                        )
                    })
            }
        </>
    )
}

export default Projects
