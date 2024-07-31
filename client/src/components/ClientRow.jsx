import { Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries:[{query: GET_CLIENTS},{query: GET_PROJECTS}]
  })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <Button onClick={deleteClient} variant="danger">
          <FaTrash />
        </Button>
      </td>
    </tr>
  )
}

export default ClientRow
