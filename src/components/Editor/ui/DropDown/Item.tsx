import { FC, MouseEvent, ReactNode } from "react";

interface IProps {
  className:string;
  children:ReactNode;
  onClick:(event:MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}

const Item:FC<IProps> = (props) => {

  const { 
    className,
    children,
    onClick,
    title
  } = props;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

export default Item;