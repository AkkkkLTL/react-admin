import { Button, Form, Input } from "antd";
import { FC, SetStateAction, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { SignInReq } from "@/api/services/userService";
import { signIn } from "@/store/modules/userSlice";
import { AppDispatch } from "@/store";
import { RouteObject, useNavigate, useOutletContext } from "react-router-dom";
import { GLOBAL_CONFIG } from "@/global-config";
import { RouterContext } from "@/router/context";

const LoginForm:FC = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { fetchMenuData } = useContext(RouterContext);

    const onFinish = async ({username, password}:SignInReq) => {
        try {
            await dispatch(signIn({username, password}));
            fetchMenuData();
            navigate(GLOBAL_CONFIG.defaultRoute);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="mb-4 text-2xl font-bold">{t("sys.login.signInFormTitle")}</div>
            <Form
                name="login"
                size="large"
                initialValues={{
                    remember: true,
                    username: "",
                    password: "",
                }}
                onFinish={onFinish}
            >
                <Form.Item name="username" rules={[{ required:true, message:t("sys.login.accountPlaceholder")}]}>
                    <Input placeholder={t("sys.login.userName")} />
                </Form.Item>
                <Form.Item name={"password"} rules={[{ required:true, message:t("sys.login.passwordPlaceholder")}]}>
                    <Input.Password type="password" placeholder={t("sys.login.password")} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {t("sys.login.loginButton")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default LoginForm;