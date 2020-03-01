import { mutationField, inputObjectType, arg } from "nexus";
import { AuthenticationError } from "apollo-server";

export const CreateBirmInput = inputObjectType({
  name: "CreateBirmInput",
  definition(t) {
    t.string("name"), t.list.float("coordinates");
  }
});

export const createBirm = mutationField("createBirm", {
  type: "Birm",
  args: {
    input: arg({
      type: "CreateBirmInput",
      required: true
    })
  },
  async resolve(root, args, context) {
    if (!context.authorized) {
      return new AuthenticationError("must authenticate");
    }

    return context.dataSources.birm.addBirm(args.input);
  }
});
