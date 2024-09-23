import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const AppMain:FC = () => {

  const path = useLocation().pathname;

  return (
    <section className="app-main">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={path}
          addEndListener={(node, doneCallBack) => node.addEventListener("transitionend", doneCallBack)}
        >
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </section>
  )
}

export default AppMain;