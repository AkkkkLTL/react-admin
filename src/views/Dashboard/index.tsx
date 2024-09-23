import { FC } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";

const Dashboard:FC = () => {

  const name = useSelector((state:RootState) => state.user.name);

  return (
    <div className="dashboard-container">
      <div className="dashboard-text">name: {name}</div>
    </div>
  )
}

export default Dashboard;