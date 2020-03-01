import { objectType } from "nexus";

export const Location = objectType({
  name: "Location",
  definition(t) {
    t.string("type");
    t.list.float("coordinates");
  }
});
