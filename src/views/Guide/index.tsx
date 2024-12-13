import { FC, useEffect, useState } from "react";
import {Config, driver} from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Guide:FC = () => {

  const config:Config = {
    steps: [
      {
        element: '.hamburger-container',
        popover: {
          title: "Hamburger",
          description: "Open && Close sidebar",
          side: "bottom"
        }
      },
      {
        element: ".breadcrumb-container",
        popover: {
          title: "Breadcrumb",
          description: "Indicate the current page location",
          side: "bottom"
        }
      },
    ]
  }

  const [tourInstance, setTourInstance] = useState<ReturnType<typeof driver>>();

  useEffect(() => {
    setTourInstance(driver(config));
  }, []);

  const handleGuideClick = () => {
    if (tourInstance) tourInstance.drive();
  }

  return (
    <div className="app-container">
      <aside>
        The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
        features of the project. Demo is based on 
        <a href="https://driverjs.com/" target="_blank">driver.js</a>
      </aside>
      <Button icon={<QuestionCircleOutlined />} type="primary" onClick={handleGuideClick}>Show Guide</Button>
    </div>
  )
}

export default Guide;