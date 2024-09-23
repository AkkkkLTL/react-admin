import service from "@/utils/request";

export function login(data:any) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function getInfo(token:string) {
  return service({
    url: '/user/info',
    method: 'get',
    params: {token}
  });
}

export function logout() {
  return service({
    url: 'user/logout',
    method: 'post'
  });
}