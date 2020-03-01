import { objectType } from "nexus";

export const Birm = objectType({
  name: "Birm",
  definition(t) {
    t.id("id");
    t.string("name");
    t.field("location", {
      type: "Location"
    });
  }
});
