import SvgIcon from "@/components/SvgIcon";
import { Button, Form, Input } from "antd";
import "./styles.scss"
import { FC } from "react";
import useLogin from "./useLogin";

const Login:FC = () => {

  const {
    handleLoginSubmit
  } = useLogin();

  return (
    <div className="login-container">
      <Form 
        name="login"
        className="login-form"
        validateTrigger="onBlur"
        onFinish={handleLoginSubmit}
      >
        <div className="title-container">
          <h3 className="title">Login Form</h3>
        </div>
        <Form.Item
          name="username"
          rules={[{ required:true, message: "Please enter the correct user name"}]}
        >
          <Input
            placeholder="Username"
            tabIndex={1}
            prefix={<SvgIcon iconClass="user"/>}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required:true, message: "Please input your Password!"},
            { type: "string", min: 6, message: "The password can not be less than 6 digits"}
          ]}
        >
          <Input.Password
            name="password"
            placeholder="Password"
            prefix={<SvgIcon iconClass="password" />}
            iconRender={(visible) => (visible 
              ? <div><SvgIcon iconClass="eye-open" /></div>
              : <div><SvgIcon iconClass="eye" /></div>
            )}
          />
        </Form.Item>
        <Button block type="primary" htmlType="submit">Login</Button>
        <div className="tips">
          <span>username: admin</span>
          <span> password: any</span>
        </div>
      </Form>
    </div>
  )
}

export default Login;