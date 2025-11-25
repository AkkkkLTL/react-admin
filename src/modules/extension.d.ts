declare module '*.svg' {
  import React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: string
  export default value
}

declare module "*.json" {
  const jsonValue: any;
  export default jsonValue;
}