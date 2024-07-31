import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
   query getClients{
      clients{
        id
        email
        phone
        name
    }
}`

export const GET_CLIENT = gql`
    query getClient($id :ID!){
    client(id:$id){
        id
        email
        phone
        name
}
}
`