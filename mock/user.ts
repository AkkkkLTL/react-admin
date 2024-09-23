import { getQuery } from "./utils";

const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
}

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: RegExp("/user/login"),
    type: "post",
    response: (config:any) => {
      const { username } = JSON.parse(config.body);
      const token = tokens[username];

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: RegExp("/user/info"),
    type: "get",
    response: (config:any) => {
      console.log("get user info", getQuery(config.url));
      const { token } = getQuery(config.url);
      const info = users[token];

      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details."
        }
      }
      return {
        code: 20000,
        data: info
      }
    }
  },
  // user logout
  {
    url: RegExp("/user/logout"),
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      }
    }
  }
];