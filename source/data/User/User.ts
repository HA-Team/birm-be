import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import DataSource from "../DataSource";
import { Collection, MongoClient, ObjectId } from "mongodb";

export type TUser = {
  _id?: string | ObjectId;
  username: string;
  password: string;
};

export default class User extends DataSource {
  private users: Collection<TUser>;

  constructor(mongoClient: MongoClient) {
    super();

    this.users = mongoClient.db("birm").collection("users");

    //Method bindings
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async login(username: string, password: string) {
    try {
      const user = await this.users.findOne({ username });

      if (user) {
        const passwordVerified = await bcrypt.compare(password, user.password);

        if (passwordVerified) {
          const token = jwt.sign(
            { username, userId: user._id },
            config.tokenSecret,
            {
              expiresIn: "24h"
            }
          );

          return {
            token
          };
        }
      }

      throw new Error("User not found");
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUser(userId: string) {
    try {
      const user = await this.users.findOne({ _id: new ObjectId(userId) });

      if (user) {
        return user;
      }

      return new Error("User not found");
    } catch (err) {
      return new Error(err);
    }
  }

  async createUser(username: string, password: string) {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await this.users.insertOne({
        username,
        password: hash
      });

      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
