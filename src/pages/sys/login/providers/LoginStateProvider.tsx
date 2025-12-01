import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

export enum LoginStateEnum {
    LOGIN = 0,
    REGISTER = 1,
    RESET_PASSWORD = 2,
}

interface ILoginStateContext {
    loginState: LoginStateEnum;
    setLoginState: (loginState: LoginStateEnum) => void;
    backToLogin: () => void;
}

const LoginStateContext = createContext<ILoginStateContext>({
    loginState: LoginStateEnum.LOGIN,
    setLoginState: () => {},
    backToLogin: () => {},
});

export function useLoginStateContext() {
    const context = useContext(LoginStateContext);
    return context;
}

interface IProps {
    children: ReactNode;
}

export default function LoginStateProvider(props:IProps) {
    const { children } = props;
    const [loginState, setLoginState] = useState(LoginStateEnum.LOGIN);

    const backToLogin = () => {
        setLoginState(LoginStateEnum.LOGIN);
    }

    const value:ILoginStateContext = useMemo(
        () => ({
            loginState,
            setLoginState,
            backToLogin,
        }),
        [loginState],
    );
    
    return (
        <LoginStateContext.Provider value={value}>
            {children}
        </LoginStateContext.Provider>
    )
}