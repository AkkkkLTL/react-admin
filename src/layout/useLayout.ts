import { useState } from "react";

const useLayout = () => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  // - - - - - - - - - - 页面交互 - - - - - - - - - - - - - - -

  const toggleCollapes = () => {
    setCollapsed(!collapsed);
  }

  return {
    collapsed,
    toggleCollapes,
  }
}

export default useLayout;