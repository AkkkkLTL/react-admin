import { createContext, type PropsWithChildren, useContext, useMemo, useState } from "react";

/**
 * 登录状态上下文
 */
export enum LoginStateEnum {
	/** 登录状态 */
	LOGIN = 0,
	/** 注册状态 */
	REGISTER = 1,
	/** 重置密码状态 */
	RESET_PASSWORD = 2,
	MOBILE = 3,
	QR_CODE = 4,
}

interface LoginStateContext {
	loginState: LoginStateEnum;
	setLoginState: (loginState: LoginStateEnum) => void;
	backToLogin: () => void;
}

const LoginStateContext = createContext<LoginStateContext>({
	loginState: LoginStateEnum.LOGIN,
	setLoginState: () => {},
	backToLogin: () => {},
});

export function useLoginStateContext() {
	const context = useContext(LoginStateContext);
	return context;
}

export default function LoginProvider({ children }: PropsWithChildren) {
	const [loginState, setLoginState] = useState(LoginStateEnum.LOGIN);

	const backToLogin = () => {
		setLoginState(LoginStateEnum.LOGIN);
	};

	const value: LoginStateContext = useMemo(
		() => ({
			loginState,
			setLoginState,
			backToLogin,
		}),
		[loginState],
	);

	return <LoginStateContext.Provider value={value}>{children}</LoginStateContext.Provider>;
}
