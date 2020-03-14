import User from "./User/User";
import Birm from "./Birm/Birm";
import { MongoClient } from "mongodb";
import config from "../config";

export type TDataSources = {
  user: User;
  birm: Birm;
};

class DataApi {
  private mongoClient: MongoClient;
  public mongoDbConnected: boolean;

  constructor() {
    this.mongoDbConnected = false;
    this.mongoClient = new MongoClient(config.dbUri, {
      useUnifiedTopology: true
    });

    // Method bindings
    this.connectDb = this.connectDb.bind(this);
    this.createDataSources = this.createDataSources.bind(this);
  }

  async connectDb() {
    try {
      await this.mongoClient.connect();
      this.mongoDbConnected = this.mongoClient.isConnected();
    } catch (err) {
      throw new Error(err);
    }
  }

  createDataSources(): TDataSources {
    if (this.mongoClient) {
      return {
        user: new User(this.mongoClient),
        birm: new Birm(this.mongoClient)
      };
    }

    throw new Error("Database is disconnected");
  }
}

export default new DataApi();
