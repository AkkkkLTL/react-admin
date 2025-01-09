import { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import Items from "./Items";

interface IProps {
  disabled?:boolean;
  buttonAriaLabel?: string;
  buttonClassName:string;
  buttonIconClassName?:string;
  buttonLabel?:string;
  children:ReactNode;
  stopCloseOnClickSelf?:boolean;
}

const DropDown:FC<IProps> = (props) => {

  const {
    disabled=false,
    buttonAriaLabel,
    buttonClassName,
    buttonIconClassName,
    buttonLabel,
    children
  } = props;

  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && (
          <span className="text dropdown-button-text">{buttonLabel}</span>
        )}
        <i className="chevron-down" />
      </button>

      {openDropDown &&
        createPortal(
          <Items>
            {children}
          </Items>,
          document.body
        )}
    </>
  )
}

export default DropDown;