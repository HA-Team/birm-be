import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Context } from "../context";
import config from "../config";

export default class MongoDataSource implements DataSource {
  private context!: Context;
  name = "User";

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
  }
}
