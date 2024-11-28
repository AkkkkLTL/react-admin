import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import DashboardEditor from "./editor";
import DashboardAdmin from "./admin";

const Dashboard:FC = () => {
  const [currentRole, setCurrentRole] = useState<string>("");
  const roles = useSelector((state:RootState) => state.user.roles);

  useEffect(() => {
    if (roles.includes("editor")) {
      setCurrentRole("editorDashboard");
    } else if (roles.includes("admin")) {
      setCurrentRole("adminDashboard");
    }
  }, [roles]);

  return (
    <div className="dashboard-container">
      { currentRole === "adminDashboard" &&
        <DashboardAdmin />
      }
      { currentRole === "editorDashboard" &&
        <DashboardEditor />
      }
    </div>
  )
}

export default Dashboard;