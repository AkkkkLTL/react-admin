import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/Button";
import { faker } from "@faker-js/faker";
import { Badge, Drawer } from "antd";
import { CSSProperties, ReactNode, useState } from "react";

export default function Notice() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [count, setCount] = useState(4);

  const style:CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50, 50%",
  };

  return (
    <div>
      <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDrawerOpen(true)}>
        <Badge 
          count={count}
          styles={{
            root: { color: "inherit" },
            indicator: { color: themeVars.colors.common.white },
          }}
        >
          <Icon icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
        <Drawer
          placement="right"
          title="Notifications"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          closable={false}
          width={420}
          styles={{
            body: { padding: 0},
            mask: { backgroundColor: "transparent" },
          }}
          style={style}
          extra={
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-primary"
              onClick={() => {
                setCount(0);
                setDrawerOpen(false);
              }}
            >
              <Icon icon="solar:check-read-broken" size={20} />
            </Button>
          }
          footer={
            <div
              style={{ color: themeVars.colors.text.primary }}
              className="flex h-10 w-full items-center justify-center font-semibold"
            >
              View All
            </div>
          }
        >
          <NoticeTab />
        </Drawer>
      </Button>
    </div>
  )

}

function NoticeTab() {

  const tabChilren:ReactNode = (
    <div className="text-sm">
      <div className="flex">
        <img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
        <div className="ml-2">
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>NoticeTab</div>
  )
}