import { type ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import useLocale from "@/locales/use-locale";
import { selectUserInfo } from "@/store/modules/userSlice";
import type { KeepAliveTab } from "../types";

export function useTabLabelRender() {
	const { t } = useLocale();
	const user = useSelector(selectUserInfo);

	const specialTabRenderMap = useMemo<Record<string, (tab: KeepAliveTab) => ReactNode>>(
		() => ({
			"sys.nav.system.user_detail": (tab: KeepAliveTab) => {
				const userId = tab.params?.id;
				const defaultLabel = t(tab.label);
				if (userId) {
					return `${user?.username}-${defaultLabel}`;
				}
				return defaultLabel;
			},
		}),
		[t, user],
	);

	const renderTabLabel = (tab: KeepAliveTab) => {
		const specialRender = specialTabRenderMap[tab.label];
		if (specialRender) {
			return specialRender(tab);
		}
		return t(tab.label);
	};
	return renderTabLabel;
}
