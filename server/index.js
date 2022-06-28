require("dotenv").config();
const colors = require("colors");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const express = require("express");

const { graphqlHTTP } = require("express-graphql");

const app = express();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3033;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema/schema"),
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Listening on port ${port}`));
