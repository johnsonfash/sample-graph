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
app.use(express.json());

app.post('/post', (req, res) => {
  if (Object.keys(req.body).length) {
    res.send(req.body);
    
  } else {

    res.send({ type: "POST", name: "Tosin", age: 14 });
  }
})

app.get('/get', (req, res) => {
  if (Object.keys(req.body).length) {
    res.send(req.body);
  } else {
    res.send({ type: "GET", name: "Tosin", age: 14 });
  }
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));



const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);