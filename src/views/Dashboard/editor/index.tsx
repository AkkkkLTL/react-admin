import PanThumb from "@/components/PanThumb";
import { RootState } from "@/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Main } from "./styles";
import GithubCorner from "@/components/GithubCorner";

const DashboardEditor:FC = () => {

  const emptyGif = "https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3";

  const role = useSelector((state:RootState) => state.user.userInfo.role);
  const name = useSelector((state:RootState) => state.user.userInfo.username);
  const avatar = useSelector((state:RootState) => state.user.userInfo.avatar);

  return (
    <Main className="dashboard-editor-container">
      <div className="clearfix">
        <PanThumb 
          image={avatar || emptyGif}
          float="left"
        >
          Your roles: 
          {roles.map((item) => (
            <span key={item} className="pan-info-roles">{item}</span>
          ))}
        </PanThumb>
        <GithubCorner style={{position:"absolute", top:"0px", border:0, right:0}} />
        <div className="info-container">
          <span className="display-name">{name}</span>
          <span style={{
            fontSize: '20px',
            paddingTop: '20px',
            display: "inline-block",
          }}>Editor's Dashboard</span>
        </div>
      </div>
      <div>
        <img src={emptyGif} className="emptyGif" />
      </div>
    </Main>
  )
}

export default DashboardEditor;