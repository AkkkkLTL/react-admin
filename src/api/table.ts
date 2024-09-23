import service from "@/utils/request";

export function getList(params?:any) {
  return service({
    url: '/table/list',
    method: 'get',
    params
  })
}