import { ComponentType, FC } from "react";
import "./styles.scss"

export interface IProps {
  loading: boolean;
}

type HOC = <P>(WrappedComponent:ComponentType<P>) => FC<P & IProps>;

const withLoader:HOC = (
  WrappedComponent
) => ({ loading, ...props }: IProps) =>
  loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <WrappedComponent {...props} />
  );

export default withLoader;