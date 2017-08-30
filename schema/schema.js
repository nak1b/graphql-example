const graphql = require('graphql');
const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema 
} = graphql;


const users = [
	{ id: 1, firstName: 'Joe', age: 21},
	{ id: 2, firstName: 'Doe', age: 41},
	{ id: 3, firstName: 'Bill', age: 22},
	{ id: 4, firstName: 'Sam', age: 14},
	{ id: 5, firstName: 'John', age: 38},
	{ id: 6, firstName: 'Bob', age: 65},
];


const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString } ,
		age: { type: GraphQLInt }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: { 
		user: {
			type: UserType,
			args: { id: { type: GraphQLString }},
			resolve(parentValue, args) {
				return _.find(users, { id: args.id });
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});