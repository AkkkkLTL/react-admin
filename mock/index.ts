import { mock } from "mockjs";
import user from "./user";
import table from "./table";
import { getQuery } from "./utils";

export const mocks = [
  ...user,
  ...table
];

type Request = {
  body: string,
  type: "get" | "post",
  url: string
}

export function mockXHR() {
  const XHR2ExpressReqWrap = (respond:any) => {
    return (options:Request) => {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: getQuery(url)
        });
      } else {
        result = respond;
      }
      return mock(result);
    }
  }
  for (const i of mocks) {
    mock(new RegExp(i.url), i.type || "get", XHR2ExpressReqWrap(i.response));
  }
};