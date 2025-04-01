import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

const PageError:FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props;

  const goHome = () => {
    resetErrorBoundary();
  };

  return (
    <div>
      <button
        onClick={goHome}
      >
        Go to Home
      </button>
    </div>
  )
}
export default PageError;