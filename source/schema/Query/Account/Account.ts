import { objectType, inputObjectType, arg } from "nexus";
import { AuthenticationError } from "apollo-server";

export const CoordinatesInput = inputObjectType({
  name: "CoordinatesInput",
  definition(t) {
    t.list.float("coordinates");
  }
});

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.list.field("birms", {
      type: "Birm",
      args: {
        input: arg({
          type: "CoordinatesInput",
          required: true
        })
      },
      async resolve(root, { coordinates }, context) {
        if (!context.authorized()) {
          return new AuthenticationError("Must authenticate");
        }

        const birms = await context.dataSources.birm.getNearBirms(coordinates);

        return birms;
      }
    });
  }
});
