import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Logo from "./assets/icons/ic-logo-badge.svg";
import { MotionLazy } from "./components/animate/motion-lazy.tsx";
import { RouteLoadingProgress } from "./components/loading/route-loading.tsx";
import Toast from "./components/toast/index.tsx";
import { GLOBAL_CONFIG } from "./global-config.ts";
import { store, storePersistor } from "./store/index.ts";
import { AntdAdapter } from "./theme/adapter/antd.adapter.tsx";
import { ThemeProvider } from "./theme/theme-provider.tsx";

interface IProps {
	children: ReactNode;
}

export default function App({ children }: IProps) {
	console.log("渲染APP");

	return (
		<Provider store={store}>
			<PersistGate persistor={storePersistor}>
				<HelmetProvider>
					<QueryClientProvider client={new QueryClient()}>
						<ThemeProvider adapters={[AntdAdapter]}>
							<Helmet>
								<title>{GLOBAL_CONFIG.appName}</title>
								<link rel="icon" href={Logo} />
							</Helmet>
							<Toast />
							<RouteLoadingProgress />
							<MotionLazy>{children}</MotionLazy>
						</ThemeProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</PersistGate>
		</Provider>
	);
}
