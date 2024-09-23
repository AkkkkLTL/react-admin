import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { Action, AppThunk, userState } from "../types";
import { getToken, setToken as auth_setToken, removeToken } from "@/utils/auth";
import { login as loginApi, logout as logoutApi, getInfo as getInfoApi } from "@/api/user";

const getDefaultState = ():userState => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
    setName: (state, action:Action<string>) => {
      state.name = action.payload;
    },
    setAvatar: (state, action:Action<string>) => {
      state.avatar = action.payload;
    }
  }
});

export const {
  resetState,
  setToken,
  setAvatar,
  setName
} = userSlice.actions;

export default userSlice.reducer;

export const login:any = (userInfo:{username:string, password:string}):AppThunk => async (dispatch: Dispatch) => {
  const { username, password } = userInfo;
  loginApi({ username: username.trim(), password: password})
  .then(response => {
    const { data } = response;
    dispatch(setToken(data.token));
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
    const { name, avatar } = data;
    dispatch(setName(name));
    dispatch(setAvatar(avatar));
  }).catch(error => {
    throw new Error(error);
  })
}

export const logout:any = ():AppThunk => async (dispatch:Dispatch) => {
  logoutApi().then(() => {
    removeToken();
    dispatch(resetState());
  }).catch(error => {
    throw new Error(error);
  })
}

export const resetToken:any = ():AppThunk => async (dispatch:Dispatch) => {
  removeToken();
  dispatch(resetState());
}