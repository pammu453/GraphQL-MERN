import { Button } from "react-bootstrap"
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from "../mutations/projectMurtations"
import { GET_PROJECTS } from '../queries/projectQueries'
import {useNavigate} from 'react-router-dom'

const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        update(cache, { data: { deleteProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.filter(project => project.id !== deleteProject.id) }
            })
        }
    })

    const deleteProjectHandler = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject()
            navigate('/')
        }
    }

    return (
        <>
            <Button className="bg-danger" onClick={deleteProjectHandler}>
                <FaTrash />
                <span>
                    Delete Project
                </span>
            </Button>
        </>
    )
}

export default DeleteProjectButton
