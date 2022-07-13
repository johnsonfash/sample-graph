var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    user(input: UserInput): User
  }
  input UserInput {
    name: String!,
    age: Int!
  }
  type User {
    name: String,
    age: Int
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  user: async ({ input }) => {
    return input
  }
};

var app = express();

app.use(require('cors')());

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);