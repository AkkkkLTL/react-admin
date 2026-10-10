import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiLibraryGameEnumInfo } from "@/api/services/library-game.service";
import type { GameCategory, GamePlatform, GameSeries } from "../../types";

interface GameEnumContext {
	category: GameCategory[];
	platform: GamePlatform[];
	series: GameSeries[];
	setCategory: (category: GameCategory[]) => void;
	setPlatform: (platform: GamePlatform[]) => void;
	setSeries: (series: GameSeries[]) => void;
}

const GameEnumContext = createContext<GameEnumContext>({
	category: [],
	platform: [],
	series: [],
	setCategory: () => {},
	setPlatform: () => {},
	setSeries: () => {},
});

export function useGameEnumContext() {
	const context = useContext(GameEnumContext);
	return context;
}

export default function GameEnumProvider({ children }: PropsWithChildren) {
	const [category, setCategory] = useState<GameCategory[]>([]);
	const [platform, setPlatform] = useState<GamePlatform[]>([]);
	const [series, setSeries] = useState<GameSeries[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const res = await apiLibraryGameEnumInfo();
		setCategory(res.categoryList || []);
		setPlatform(res.platformList || []);
		setSeries(res.seriesList || []);
	};

	const value: GameEnumContext = useMemo(
		() => ({
			category,
			platform,
			series,
			setCategory,
			setPlatform,
			setSeries,
		}),
		[category, platform, series],
	);

	return <GameEnumContext.Provider value={value}>{children}</GameEnumContext.Provider>;
}
