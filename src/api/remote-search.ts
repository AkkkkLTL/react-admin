import service from "@/utils/request";

export function searchUser(name:string) {
  return service({
    url: "/search/user",
    method: "get",
    params: {name}
  })
}

export function transactionList(query?:any) {
  return service({
    url: "/transaction/list",
    method: "get",
    params: query
  })
}