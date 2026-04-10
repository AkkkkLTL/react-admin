import { createContext, type ReactNode, useContext } from "react";

interface RouterContext {
	fetchMenuData: () => Promise<void>;
}

const RouterContext = createContext<RouterContext>({
	fetchMenuData: async () => {},
});

export function useRouterContext() {
	const context = useContext(RouterContext);
	return context;
}

interface RouterProviderProps {
	children: ReactNode;
	value: RouterContext;
}

export function RouterContextProvider({ children, value }: RouterProviderProps) {
	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
