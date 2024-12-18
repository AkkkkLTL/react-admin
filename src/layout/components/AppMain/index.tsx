import { LazyMotion, domMax, m } from "framer-motion";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppMain:FC = () => {

  const path = useLocation().pathname;

  return (
    <section className="app-main">
      <LazyMotion strict features={domMax}>
        <m.div style={{height: "100%"}}>
          <Outlet />
        </m.div>
      </LazyMotion>
    </section>
  )
}

export default AppMain;