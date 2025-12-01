import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { UserApi } from "@/api/services/userService";
import { DB_SYS_MENUS, DB_SYS_PERMISSION, DB_SYS_ROLE, DB_SYS_ROLE_PERMISSION, DB_SYS_USER, DB_SYS_USER_ROLE } from '../assets';
import { converFlatToTree } from '@/utils/tree';
import { ResultEnum } from '#/enum';

/**
 * 模拟登录
 */
const signIn = http.post(`/api${UserApi.SignIn}`, async ({request}) => {
  const { username, password } = (await request.json()) as Record<string, string>;

  const user = DB_SYS_USER.find((item) => item.username === username);

  // 模拟用户不存在或密码错误
  if (!user || user.password !== password) {
    return HttpResponse.json({
      code: 10001,
      message: '用户名或密码错误',
    },
    {
      status: 200,
    })
  }

  // 获取去除密码之后的用户信息
  const { password:_, ...userWithoutPassword } = user;

  // 获取用户对应的角色
  const roles = DB_SYS_USER_ROLE.filter((item) => item.userId === user.id).map((item) => 
    DB_SYS_ROLE.find((role) => role.id === item.roleId),
  );

  // 获取用户角色对应的权限
  const permissions = DB_SYS_ROLE_PERMISSION.filter((item) => roles.some((role) => role?.id === item.roleId)).map((item) => 
    DB_SYS_PERMISSION.find((permission) => permission.id === item.permissionId),
  );

  // 获取用户的菜单并转换为树形结构
  const menu = converFlatToTree(DB_SYS_MENUS);

  console.log("菜单", menu);

  // 模拟登录成功，返回用户信息和令牌
  return HttpResponse.json({
    code: ResultEnum.SUCCESS,
    message: '登录成功',
    data: {
      user: {...userWithoutPassword, roles, permissions, menu },
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
    }
  },
  {
    status: 200,
  });
})

/**
 * 模拟获取用户列表
 */
const userList = http.get(`/api${UserApi.User}`, async () => {
  return HttpResponse.json(
    {
      code: ResultEnum.SUCCESS,  // 业务数据状态
      message: '获取用户列表成功',
      data: Array.from({length: 10}).map(() => ({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatarGitHub(),
        address: faker.location.streetAddress(),
      })),
    },
    {
      status: 200,  // HTTP状态
    }  
  );
});

export {
  signIn,
  userList,
};