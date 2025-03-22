import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';

import { UserApi } from "@/api/services/userService";
import { USER_LIST } from '../assets';

const signIn = http.post(`/api${UserApi.SignIn}`, async ({request}) => {
  const { username, password } = await request.json();

  const user = USER_LIST.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10001,
      msg: '用户名或密码错误',
    })
  }

  return HttpResponse.json({
    status: 0,
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
  return HttpResponse.json(
    Array.from({length: 10}).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: faker.location.streetAddress(),
    })),
    {
      status: 200,
    }
  )
});
export default [signIn, userList];