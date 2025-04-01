import { http, HttpResponse, delay, HttpHandler } from 'msw';
import { faker } from '@faker-js/faker';

import { UserApi } from "@/api/services/userService";
import { USER_LIST } from '../assets';

const signIn = http.post(`/api${UserApi.SignIn}`, async ({request}) => {
  const { username, password } = await request.json() as any;

  const user = USER_LIST.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return HttpResponse.json({
      code: 400,
      message: '用户名或密码错误',
    })
  }

  return HttpResponse.json({
    code: 200,
    msg: '登录成功',
    data: {
      user,
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
    }
  })
})

const userList = http.get(`/api${UserApi.User}`, async () => {
  await delay(1000);
  return HttpResponse.json({
    code: 200,
    msg: '获取用户列表成功',
    data: Array.from({length: 10}).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: faker.location.streetAddress(),
    })),
  })
});
export default [signIn, userList] as HttpHandler[];