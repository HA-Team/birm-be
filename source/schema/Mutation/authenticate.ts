import { mutationField, inputObjectType, objectType, arg } from "nexus";
import { resolve } from "dns";

export const AuthenticateUserInput = inputObjectType({
  name: "AuthenticateUserInput",
  definition(t) {
    t.string("username");
    t.string("password");
  }
});

export const AuthenticateUserPayload = objectType({
  name: "AuthenticateUserPayload",
  definition(t) {
    t.string("token", { nullable: true });
  }
});

export const authenticate = mutationField("authenticate", {
  type: "AuthenticateUserPayload",
  args: {
    input: arg({
      type: "AuthenticateUserInput",
      required: true
    })
  },
  async resolve(root, args, context) {
    const { token } = await context.dataSources.user.login(
      args.input.username,
      args.input.password
    );

    return { token };
  }
});
