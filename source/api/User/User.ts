import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import MongoDataSource from "../MongoDataSource";
import UserModel from './UserModel';

export default class User extends MongoDataSource {
  name = "User";

  async login(username: string, password: string) {
    try {
      const user = await UserModel.findOne({ username });

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
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUser(userId: string) {
    try {
      const user = await UserModel.findOne({ _id: userId });

      if (user) {
        return user;
      }

      return null;
    } catch (err) {
      return new Error(err);
    }
  }

  async createUser(username: string, password: string) {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await new UserModel({
        username,
        password: hash
      }).save();

      return newUser;
    } catch (err) {
      return err;
    }
  }
}
