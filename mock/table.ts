import { mock } from "mockjs";

const data = mock({
  'items|30': [{
    "id|+1": 0,
    "title": "@sentence(10, 20)",
    "status|1": ["published", "draft", "deleted"],
    "author": "name",
    "display_time": "@datetime",
    "pageviews": "@integer(300, 5000)"
  }]
});

export default [{
  url: RegExp("/table/list"),
  type: "get",
  response: () => {
    const items = data.items;
    return {
      code: 20000,
      data: {
        total: items.length,
        items: items
      }
    }
  }
}]