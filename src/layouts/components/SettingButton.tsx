import { RootState } from "@/store";
import { setSettings } from "@/store/modules/settingsSlice";
import { themeVars } from "@/theme/theme.css";
import { ThemeColorPresets, ThemeLayout, ThemeMode } from "@/types/enum";
import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import screenfull from "screenfull";
import { m } from "framer-motion";
import { Button } from "@/ui/Button";
import { Icon } from "@/components/icon";
import { Card, Drawer } from "antd";

export default function SettingButton() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(screenfull.isFullscreen);
  const dispatch = useDispatch();
  const settings = useSelector((state:RootState) => state.settings);

  const setThemeMode = (themeMode:ThemeMode) => {
    dispatch(setSettings({
      ...settings,
      themeMode,
    }));
  };

  const setThemeColorPresets = (themeColorPresets:ThemeColorPresets) => {
    dispatch(setSettings({
      ...settings,
      themeColorPresets,
    }));
  };

  const setThemeLayout = (themeLayout:ThemeLayout) => {
    dispatch(setSettings({
      ...settings,
      themeLayout,
    }));
  };

  const setThemeStretch = (themeStretch:boolean) => {
    dispatch(setSettings({
     ...settings,
      themeStretch,
    }));
  };

  const setDarkSidebar = (checked:boolean) => {
    dispatch(setSettings({
     ...settings,
      darkSidebar:checked,
    }));
  };

  const setFontFamily = (fontFamily:string) => {
    dispatch(setSettings({
    ...settings,
      fontFamily,
    }));
  };

  const setFontSize = (fontSize:number) => {
    dispatch(setSettings({
   ...settings,
      fontSize,
    }));
  };

  const setAccordion = (checked:boolean) => {
    dispatch(setSettings({
   ...settings,
      accordion:checked,
    }));
  };

  const style:CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundColor: `rgba(${themeVars.colors.background.paperChannel} / 0.9)`,
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50, 50%",
  };

  const toggleFullScreen = () => {
   if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullScreen(!isFullScreen);
    }
  };

  const layoutBackgound = (layout:ThemeLayout) => 
    settings.themeLayout === layout
      ? `linear-gradient(135deg, ${themeVars.colors.background.neutral} 0%, ${themeVars.colors.palette.primary.default} 100%)`
      : themeVars.colors.palette.gray[500];

  return (
    <>
      <div className="flex items-center justify-center overflow-hidden">
        <m.div
          animate={{
            rotate: [0, drawerOpen ? 0 : 360],
          }}
          transition={{
            duration: 12,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          whileTap="tap"
          whileHover="hover"
          onClick={() => setDrawerOpen(true)}
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon icon="lsicon:setting-filled" size={24} />
          </Button>
        </m.div>
      </div>
      <Drawer
        placement="right"
        title={t("sys.settings.title")}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        styles={{
          body: { padding: 0},
          mask: { backgroundColor: "transparent"},
        }}
        style={style}
        extra={
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)} className="rounded-full">
            <Icon icon="lucide:x" size={20} />
          </Button>
        }
        footer={
          <Button
            variant="outline"
            className="w-full border-dashed hover:border-primary hover:text-primary"
            onClick={toggleFullScreen}
          >
            <div 
              className="flex items-center justify-center"
              aria-label={isFullScreen ? t("sys.settings.exitFullscreen") : t("sys.settings.fullscreen")}
            >
              {isFullScreen ? (
                <>
                  <Icon icon="bx:exit-fullscreen" />
                  <span className="ml-2">{t("sys.settings.exitFullscreen")}</span>
                </>
              ) : (
                <>
                  <Icon icon="bx:exit-fullscreen" />
                  <span className="ml-2">{t("sys.settings.fullscreen")}</span>
                </>
              )}
            </div>
          </Button>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          {/* 主题模式 */}
          <div>
            <div className="mb-3">{t("sys.settings.mode")}</div>
            <div className="flex flex-row gap-4">
              <Card
                onClick={() => setThemeMode(ThemeMode.LIGHT)}
                className="flex h-20"
              >
                <Icon
                  icon="lucide:sun"
                  size={24}
                  color={settings.themeMode === ThemeMode.LIGHT ? themeVars.colors.palette.primary.default : ""}
                />
              </Card>
              <Card
                onClick={() => setThemeMode(ThemeMode.DARK)}
                className="flex h-20"
              >
                <Icon
                  icon="lucide:moon"
                  size={24}
                  color={settings.themeMode === ThemeMode.DARK? themeVars.colors.palette.primary.default : ""}
                />
              </Card>
            </div>
          </div>
          {/* 主题层级 */}
          <div>
            <div className="mb-3">{t("sys.settings.layout")}</div>
            <div className="grid grid-cols-3 gap-4">
              <Card
                onClick={() => setThemeLayout(ThemeLayout.VERTICAL)}
                className="flex h-20"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  },
                }}
              >
                <div className="flex h-full">
                  <div className="h-2"
                    style={{
                      background: layoutBackgound(ThemeLayout.VERTICAL),
                    }}
                  />
                  <div
                    className="flex h-full"
                    style={{
                      background: layoutBackgound(ThemeLayout.VERTICAL),
                    }}
                  />
                  <div
                    className="h-1 max-w-[12px]"
                    style={{
                      background: layoutBackgound(ThemeLayout.VERTICAL),
                    }}
                  />
                </div>
                <div className="h-full w-full flex-1 grow p-1">
                  <div
                    className="h-full w-full"
                    style={{
                      background: layoutBackgound(ThemeLayout.VERTICAL),
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}