import { RefObject, createContext } from "react";

type DropDownContextType = {
  registerItem: (ref:RefObject<HTMLButtonElement>) => void;
}

export const DropDownContext = createContext<DropDownContextType | null>(null);