import type { FallbackProps } from "react-error-boundary";

export default function PageError({
  error,
  resetErrorBoundary,
}:FallbackProps) {

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