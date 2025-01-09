import { FC, ReactNode, RefObject, useCallback, useMemo, useState } from "react";
import { DropDownContext } from "./context";

interface IProps {
  children:ReactNode;
}

const Items:FC<IProps> = (props) => {

  const {
    children
  } = props;

  const [items, setItems] = useState<RefObject<HTMLButtonElement>[]>();

  const registerItem = useCallback(
    (itemRef:RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems],
  )

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem]
  )

  return (
    <DropDownContext.Provider value={contextValue}>
      <div className="dropdown">
        {children}
      </div>
    </DropDownContext.Provider>
  )
}

export default Items;