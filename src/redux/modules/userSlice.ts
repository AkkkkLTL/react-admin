import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { Action, AppThunk, userState } from "../types";
import { getToken, setToken as auth_setToken, removeToken } from "@/utils/auth";
import { login as loginApi, logout as logoutApi, getInfo as getInfoApi } from "@/api/user";

const getDefaultState = ():userState => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: <userState>getDefaultState(),
  reducers: {
    resetState: (state) => {
      Object.assign(state, getDefaultState());
    },
    setToken: (state, action:Action<string>) => {
      state.token = action.payload;
    },
    setIntroduction: (state, action:Action<string>) => {
      state.introduction = action.payload;
    },
    setName: (state, action:Action<string>) => {
      state.name = action.payload;
    },
    setAvatar: (state, action:Action<string>) => {
      state.avatar = action.payload;
    },
    setRoles: (state, action:Action<string[]>) => {
      state.roles = action.payload;
    }
  }
});

export const {
  resetState,
  setToken,
  setAvatar,
  setName,
  setRoles,
  setIntroduction,
} = userSlice.actions;

export default userSlice.reducer;

export const login:any = (userInfo:{username:string, password:string}):AppThunk => async (dispatch: Dispatch) => {
  const { username, password } = userInfo;
  loginApi({ username: username.trim(), password: password})
  .then(response => {
    const { data } = response;
    dispatch(setToken(data.token));
    dispatch(getInfo(data.token));
    auth_setToken(data.token);
  }).catch(error => {
    throw new Error(error);
  })
}

export const getInfo:any = (token:string):AppThunk => async (dispatch:Dispatch) => {
  getInfoApi(token).then(response => {
    const { data } = response;
    if (!data) {
      throw new Error("Verification failed, please Login again");
    }
    const { name, avatar, roles, introduction } = data;

    if (!roles || roles.length <= 0) {
      throw new Error("getInfo: roles must be a non-null array!")
    }
    dispatch(setRoles(roles));
    dispatch(setName(name));
    dispatch(setAvatar(avatar));
    dispatch(setIntroduction(introduction));
  }).catch(error => {
    throw new Error(error);
  })
}

export const logout:any = ():AppThunk => async (dispatch:Dispatch) => {
  logoutApi().then(() => {
    removeToken();
    dispatch(resetState());
    dispatch(setRoles([]));
  }).catch(error => {
    throw new Error(error);
  })
}

export const resetToken:any = ():AppThunk => async (dispatch:Dispatch) => {
  removeToken();
  dispatch(resetState());
  dispatch(setRoles([]));
}

export const changeRoles:any = (role:string):AppThunk => async (dispatch:Dispatch) => {
  const token = role + '-token';
  dispatch(setToken(token));
  auth_setToken(token);

  const { roles } = await dispatch(getInfo(token));
}