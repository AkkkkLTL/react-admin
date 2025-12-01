import { PayloadAction, createAsyncThunk, createSlice, type Reducer } from "@reduxjs/toolkit";
import { produce } from "immer";
import userService, { SignInReq, SignInRes } from "@/api/services/userService";
import type { UserInfo, UserToken } from "#/entity";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { toast } from "sonner";

// 定义用户状态类型
type UserState = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
}

// 初始状态
const initialState:UserState = {
  userInfo: {},
  userToken: {},
};

// 异步登录操作
export const signIn = createAsyncThunk(
  "user/login",
  async (data:SignInReq, { dispatch }) => {

    // const signInMutation = useMutation({
    //   mutationFn: userService.signin,
    // });

    try {
      const res = await userService.signin(data);
      const { user, accessToken, refreshToken } = res;
      dispatch(setUserInfo(user));
      dispatch(setUserToken({ accessToken, refreshToken }));
      sessionStorage.setItem("isLogined", "true");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
      throw error;
    }
  }
)

// 创建 slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return produce(state, draft => {
        Object.assign(draft.userInfo, action.payload);
      });
    },
    setUserToken: (state, action: PayloadAction<UserToken>) => {
      return produce(state, draft => {
        Object.assign(draft.userToken, action.payload);
      });;
    },
    clearUserInfoAndToken: (state) => {
      return produce(state, draft => {
        Object.assign(draft, initialState);
      })
      debugger;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {});
  }
});

// 导出 action
export const {
  setUserInfo,
  setUserToken,
  clearUserInfoAndToken,
} = userSlice.actions;

export const useUserInfo = () => useSelector((state:RootState) => state.user.userInfo);
export const useUserToken = () => useSelector((state:RootState) => state.user.userToken);
export const useUserPermissions = () => useSelector((state:RootState) => state.user.userInfo.permissions || []);
export const useUserRoles = () => useSelector((state:RootState) => state.user.userInfo.roles || []);

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