import { Layout } from "antd";
import { type CSSProperties, type FC, Suspense } from "react";

import Header from "./Header";
import Nav from "./nav";
import Main from "./Main";
import { NAV_WIDTH } from "./config";
import { CircleLoading } from "@/components/loading";

const DashboardLayout:FC = () => {

    const secondLayoutStyle:CSSProperties = {
        display: "flex",
        flexDirection: "column",
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        paddingLeft: NAV_WIDTH,
    }

    return (
        <Layout className="flex h-screen overflow-hidden flex-row">
            <Suspense fallback={<CircleLoading />}>
                <Layout style={secondLayoutStyle}>
                    <Header />
                    <Nav />
                    <Main />
                </Layout>
            </Suspense>
        </Layout>
    )
}
export default DashboardLayout;