import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import * as allTypes from "./schema";
import * as path from "path";
import createContext from "./context";
import dataApi from "./data";

async function startServer() {
  try {
    console.log("Connecting to database...");
    await dataApi.connectDb();

    if (dataApi.mongoDbConnected) {
      console.log("Connected!");
    }

    const nexusSchema = makeSchema({
      types: allTypes,
      outputs: {
        schema: path.join(__dirname, "../schema.graphql"),
        typegen: path.join(__dirname, "../schema.d.ts")
      }
    });

    const server = new ApolloServer({
      schema: nexusSchema,
      context: createContext,
      dataSources: dataApi.createDataSources
    });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (err) {
    console.error("Error in db connection: ", err);
  }
}

startServer();
