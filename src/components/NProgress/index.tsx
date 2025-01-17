import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { FC, Fragment, useEffect } from "react";

const NProgress:FC = () => {
  useEffect(() => {
    nProgress.start();

    return () => {
      nProgress.done();
    }
  }, []);

  return <Fragment />
}

export default NProgress;