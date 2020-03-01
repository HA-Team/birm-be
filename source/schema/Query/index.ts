import { objectType } from "nexus";
import { AuthenticationError } from "apollo-server";

export * from "./User";
export * from "./Account";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("viewer", {
      type: "User",
      async resolve(root, args, context) {
        if (!context.authorized()) {
          return new AuthenticationError("Must authenticate");
        }

        const userId = context.getUserId();

        const user = await context.dataSources.user.getUser(userId);

        return user;
      }
    });
  }
});
