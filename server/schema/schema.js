const { projects, clients } = require("../sampleData");

// Mongoose Models
const Project = require("../models/Projects");
const Client = require("../models/Clients");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Client Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => Client.find({}),
    },
    client: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Client.findById(args.id),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find({}),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Project.findById(args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
