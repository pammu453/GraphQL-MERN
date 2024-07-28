// import { projects, clients } from "../sampleData.js"
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

// mongoose models
import Client from "../models/Client.js"
import Project from "../models/Project.js"

//CLient Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

//Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: (project) => Client.findById(project.clientId)
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: () => Client.find()
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Client.findById(id)
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: () => Project.find()
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Project.findById(id)
        }
    }
})

const graphSchema = new GraphQLSchema({
    query: RootQuery
})

export default graphSchema;