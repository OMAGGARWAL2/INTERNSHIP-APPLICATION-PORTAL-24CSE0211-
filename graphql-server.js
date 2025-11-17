// GraphQL Server for InternHub
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphql-schema');

const app = express();
const PORT = 4000;

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface for testing
}));

app.listen(PORT, () => {
  console.log(`InternHub GraphQL server running at http://localhost:${PORT}/graphql`);
  console.log('Use GraphiQL interface to test queries and mutations');
});