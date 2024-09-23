import { mock } from "mockjs";
import user from "./user";
import table from "./table";

const mocks = [
  ...user,
  ...table
];

for (const i of mocks) {
  mock(i.url, i.type, i.response);
}