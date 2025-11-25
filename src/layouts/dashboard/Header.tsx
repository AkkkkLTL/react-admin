import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { Button } from "antd";
import { CSSProperties, FC } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { rgbAlpha } from "@/utils/theme";
import { themeVars } from "@/theme/theme.css";
import { HEADER_HEIGHT } from "./config";
import AccountDropdown from "../components/AccountDropdown";
import SearchBar from "../components/SearchBar";

/**
 * DahboardLayout 头部
 */
export default function Header() {
    const headerStyle:CSSProperties = {
        backgroundColor: rgbAlpha(themeVars.colors.background.defaultChannel, 0.9),
        width: "100%",
    }

    return (
        <header 
            className="sticky top-0 right-0 left-auto"
            style={headerStyle}
        >
            <div 
                className="flex grow items-center justify-between px-4"
                style={{
                    height: HEADER_HEIGHT,
                }}
            >
                {/* 面包屑 */}
                <div>
                    <BreadCrumb />
                </div>
                {/* 头部右侧配置 */}
                <div className="flex items-center">
                    <SearchBar />
                    {/* LocalePicker */}
                    <Button
                        variant="dashed"
                        size="middle"
                        className="rounded-full"
                        onClick={() => window.open("https://github.com/akkkltl/react-admin")}
                    >
                        <Icon icon="mdi:github" size={24} />
                    </Button>
                    <Button
                        variant="dashed"
                        size="middle"
                        className="rounded-full"
                        onClick={() => window.open("https://github.com/akkkltl")}
                    >
                        <Icon icon="carbon:logo-discord" size={24} />
                    </Button>
                    {/* NoticeButton */}
                    {/* SettingButton */}
                    <AccountDropdown />
                </div>
            </div>
        </header>
    )
}