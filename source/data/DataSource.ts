import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Context } from "../context";

export default class MongoDataSource implements DataSource {
  private context!: Context;
  name = "User";

  initialize(config: DataSourceConfig<Context>): void {
    this.context = config.context;
  }
}
