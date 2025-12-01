import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { HtmlDataAttribute } from "@/types/enum";
import { UILibraryAdapter } from "./type";

interface IProps {
  children: ReactNode;
  adapters?: UILibraryAdapter[];
}

const ThemeProvider:FC<IProps> = (props) => {
  const { children, adapters=[] } = props;
  const { themeMode, themeColorPresets, fontFamily, fontSize } = useSelector((state:RootState) => state.settings);

  // 更新 html 的 data-theme-mode 属性，支持 Tailwind dark 模式
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(HtmlDataAttribute.THEMEMODE, themeMode);
  }, [themeMode]);

  // 动态更新与主题色相关的 css 变量
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(HtmlDataAttribute.COLORPALETTE, themeColorPresets);
  }, [themeColorPresets]);

  // 动态更新字体
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.fontSize = `${fontSize}px`;

    const body = window.document.body;
    body.style.fontFamily = fontFamily;
  }, [fontSize, fontFamily]);

  const wrappedWithAdapters = adapters.reduce(
    (children:ReactNode, Adapter) => (
      <Adapter key={Adapter.name} mode={themeMode}>
        {children}
      </Adapter>
    ),
    children
  );
  return wrappedWithAdapters;
}
export default ThemeProvider;