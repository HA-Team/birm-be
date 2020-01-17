import {objectType} from 'nexus';

export * from './User';

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("viewer", { type: 'User' })
  }
})