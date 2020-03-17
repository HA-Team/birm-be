import * as dotenv from "dotenv";

dotenv.config();

export default {
  dbUri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds047955.mlab.com:47955/birm`,
  tokenSecret: `${process.env.MLAB_TOKEN}`
};
