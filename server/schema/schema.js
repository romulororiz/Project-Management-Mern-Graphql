// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

// Project Type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId); //Find Client in the DB that matches clientId on the project;
			},
		},
	}),
});

// For Graphiql query tool - Identify the Client that pertain to that specific ID
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parents, arg) {
				return Project.find();
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parents, arg) {
				return Client.find();
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
