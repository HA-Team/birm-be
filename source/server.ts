import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import * as allTypes from "./schema";
import * as path from "path";

const nexusSchema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, "../schema.graphql"),
    typegen: path.join(__dirname, "../schema.d.ts")
  }
});

const server = new ApolloServer({
  schema: nexusSchema,
  mocks: true
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
