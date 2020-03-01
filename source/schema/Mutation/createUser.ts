import { mutationField, inputObjectType, arg } from "nexus";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";

export const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.string("username");
    t.string("password");
  }
});

export const createUser = mutationField("createUser", {
  type: "User",
  args: {
    input: arg({
      type: "CreateUserInput",
      required: true
    })
  },
  async resolve(root, args, context) {
    if (!context.authorized()) {
      return new AuthenticationError("must authenticate");
    }

    return context.dataSources.user.createUser(
      args.input.username,
      args.input.password
    );
  }
});
