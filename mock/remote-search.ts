import { Random, mock } from "mockjs";

const NameList:{name:string}[] = [];
const count = 100;

for (let i = 0; i < count; ++i) {
  NameList.push(mock({
    name: "@first"
  }))
}
NameList.push({name: "mock-Pan"});

export default [
  {
    url: "/search/user",
    type: "get",
    response: (config:any) => {
      const { name } = config.query;
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase();
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
      })
      return {
        code: 20000,
        data: { items: mockNameList }
      }
    }
  },

  {
    url: "/transaction/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: {
          total: 20,
          "items|20":[{
            order_no: "@guid()",
            timestamp: +Random.date('T'),
            username: "@name()",
            price: "@float(1000, 15000, 0, 2)",
            "status|1": ["success", "pending"]
          }]
        }
      }
    }
  }
]