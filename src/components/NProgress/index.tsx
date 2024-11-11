import nProgress from "nprogress";
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