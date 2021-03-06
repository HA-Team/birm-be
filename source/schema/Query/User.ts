import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("_id", { nullable: true });
    t.string("username", {
      nullable: true
    });
    t.field("account", {
      type: "Account",
      resolve() {
        return {};
      }
    });
  }
});
