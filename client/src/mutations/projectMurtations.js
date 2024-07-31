import { gql } from "@apollo/client"

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!,$clientId: ID!) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
        id
        name
        status
    }
}
`
export const DELETE_PROJECT = gql`
    mutation deleteProject($id:ID!){
    deleteProject(id: $id) {
        id
        name
        status
    }
}
`