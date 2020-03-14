import { objectType, inputObjectType, arg } from "nexus";
import { AuthenticationError } from "apollo-server";

export const BirmsNearLocationInput = inputObjectType({
  name: "BirmsNearLocationInput",
  definition(t) {
    t.list.float("coordinates");
    t.int("maxDistance", { nullable: true });
  }
});

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.list.field("birms", {
      type: "Birm",
      args: {
        input: arg({
          type: "BirmsNearLocationInput",
          required: true
        })
      },
      async resolve(root, { input }, context) {
        if (!context.authorized()) {
          return new AuthenticationError("Must authenticate");
        }

        const birms = await context.dataSources.birm.getNearBirms(input);

        return birms;
      }
    });
  }
});
