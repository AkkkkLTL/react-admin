import { Content } from "antd/lib/layout/layout";
import { CSSProperties, FC } from "react";
import { Outlet } from "react-router-dom";

const Main:FC = () => {

    const mainStyle:CSSProperties = {
        paddingTop: 0,
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", // this is for the slide,
        width: "100%",
    }

    return (
        <Content className="flex" style={mainStyle}>
            <div className="flex-grow overflow-auto size-full">
                <div className="m-auto size-full flex-grow flex-row">
                    <Outlet />
                </div>
            </div>
        </Content>
    )
}
export default Main;