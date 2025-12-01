import { createContext } from "react";

export interface RouterContextValue {
    fetchMenuData: () => Promise<void>
}

export const RouterContext = createContext<RouterContextValue>({
    fetchMenuData: async () => {},
});