import { PayloadAction, createAsyncThunk, createSlice, type Reducer } from "@reduxjs/toolkit";
import { produce } from "immer";
import userService, { SignInReq } from "@/api/services/userService";

// 定义用户状态类型
type UserState = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState:UserState = {
  userInfo: {},
  userToken: {},
  loading: false,
  error: null,
};

// 异步登录操作
export const signIn:any = createAsyncThunk(
  "user/login",
  async (data:SignInReq, {rejectWithValue}) => {
    const { username, password } = data;
    try {
      const res = await userService.signin({ username:username.trim(), password });
      return res;
    } catch (error) {
      return rejectWithValue(error || "登录失败");
    }
  }
)

// 创建 slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = produce(state.userInfo, draft => {
        Object.assign(draft, action.payload);
      });
    },
    setUserToken: (state, action: PayloadAction<UserToken>) => {
      state.userToken = action.payload;
    },
    clearUserInfoAndToken: (state) => {
      state.userInfo = {};
      state.userToken = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // 处理登录操作
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// 导出 action
export const {
  setUserInfo,
  setUserToken,
  clearUserInfoAndToken
} = userSlice.actions;

// 导出 reducer
export default userSlice.reducer as Reducer<UserState>;

/*
export const getInfo:any = createAsyncThunk(
  "fetch/getInfo",
  async (token:string, {dispatch}) => {
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
      return data;
    }).catch(error => {
      throw new Error(error);
    })
  }
)

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
*/