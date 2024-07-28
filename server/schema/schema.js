// import { projects, clients } from "../sampleData.js"
import { GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

// mongoose models
import Client from "../models/Client.js"
import Project from "../models/Project.js"

// Define ProjectStatus Enum Type
const ProjectStatusEnumType = new GraphQLEnumType({
    name: 'ProjectStatus',
    values: {
        IN_PROGRESS: { value: 'In Progress' },
        COMPLETED: { value: 'Completed' },
        NOT_STARTED: { value: 'Not Started' }
    },
    defaultValue: "Not started"
});

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

// Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { name, email, phone }) => {
                const newClient = new Client({ name, email, phone })
                await newClient.save()
                return newClient
            }
        },
        deleteClient: {
            type: ClientType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (_, { id }) => {
                const deletedClient = await Client.findByIdAndDelete(id);
                return deletedClient;
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: ProjectStatusEnumType },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (_, { name, description, status, clientId }) => {
                const newProject = new Project({ name, description, status, clientId })
                await newProject.save()
                return newProject
            }
        },
        deleteProject: {
            type: ProjectType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (_, { id }) => {
                const deletedProject = await Project.findByIdAndDelete(id);
                return deletedProject;
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { type: ProjectStatusEnumType },
                clientId: { type: GraphQLID }
            },
            resolve: async (_, { id, name, description, status, clientId }) => {
                const updatedProject = await Project.findByIdAndUpdate(id, { name, description, status, clientId }, { new: true });
                return updatedProject;
            }
        }
    }
})


const graphSchema = new GraphQLSchema({
    query: RootQuery,
    mutation
})

export default graphSchema;