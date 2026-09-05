import { createSlice, type PayloadAction, type Reducer } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
import { produce } from "immer";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { MenuInfo, UserInfo, UserToken } from "#/entity";
import { apiSysLogin, type SysLoginReq } from "@/api/services/sys-login.service";
import type { RootState } from "..";

// 定义用户状态类型
type UserState = {
	userInfo: Partial<UserInfo>;
	userToken: UserToken;
	menuList: MenuInfo[];
	permissions: string[];
};

// 初始状态
const initialState: UserState = {
	userInfo: {},
	userToken: {},
	menuList: [],
	permissions: [],
};

// 创建 slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// 设置用户信息
		setUserInfo: (state, action: PayloadAction<UserInfo>) => {
			return produce(state, (draft) => {
				Object.assign(draft.userInfo, action.payload);
			});
		},
		// 设置用户令牌
		setUserToken: (state, action: PayloadAction<UserToken>) => {
			return produce(state, (draft) => {
				Object.assign(draft.userToken, action.payload);
			});
		},
		// 设置用户权限
		setPermissions: (state, action: PayloadAction<string[]>) => {
			return produce(state, (draft) => {
				draft.permissions = action.payload;
			});
		},
		// 清除用户信息和令牌
		clearUserInfoAndToken: (state) => {
			return produce(state, (draft) => {
				Object.assign(draft, initialState);
			});
		},
	},
});

// 导出 action
export const { setUserInfo, setUserToken, clearUserInfoAndToken, setPermissions } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer as Reducer<UserState>;

// 获取用户信息
export const selectUserInfo = (state: RootState) => state.user.userInfo;
// 获取用户令牌
export const selectUserToken = (state: RootState) => state.user.userToken;
// 获取用户权限
export const selectUserPermissions = (state: RootState) => state.user.permissions;
// 获取用户角色
export const selectUserRoles = (state: RootState) => state.user.userInfo.roleIdList;

export const useSignIn = () => {
	const dispatch = useDispatch();

	const signInMutation = useMutation({
		mutationFn: apiSysLogin,
	});

	const signIn = async (data: SysLoginReq) => {
		try {
			const res = await signInMutation.mutateAsync(data);
			const { expire, token } = res;
			Cookies.set("token", token, { expires: expire });
			// dispatch(setUserToken({ expire, token }));
		} catch (error) {
			toast.error(error.message, {
				position: "top-center",
			});
			throw error;
		}
	};

	return signIn;
};
