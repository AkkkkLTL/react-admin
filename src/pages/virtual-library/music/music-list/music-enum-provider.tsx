import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiLibraryCommonLanguageList } from "@/api/services/library-common.service";
import { apiLibraryMusicAlbumList, apiLibraryMusicStyleList } from "@/api/services/library-music.service";
import type { CommonLanguage, MusicAlbum, MusicStyle } from "../../types";

interface MusicEnumContext {
	style: MusicStyle[];
	album: MusicAlbum[];
	language: CommonLanguage[];
	setStyle: (style: MusicStyle[]) => void;
	setAlbum: (album: MusicAlbum[]) => void;
	setLanguage: (language: CommonLanguage[]) => void;
}

const MusicEnumContext = createContext<MusicEnumContext>({
	style: [],
	album: [],
	language: [],
	setStyle: () => {},
	setAlbum: () => {},
	setLanguage: () => {},
});

export function useMusicEnumContext() {
	const context = useContext(MusicEnumContext);
	return context;
}

export default function MusicEnumProvider({ children }: PropsWithChildren) {
	const [style, setStyle] = useState<MusicStyle[]>([]);
	const [album, setAlbum] = useState<MusicAlbum[]>([]);
	const [language, setLanguage] = useState<CommonLanguage[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const styleList = (await apiLibraryMusicStyleList()).page.list || [];
		const albumList = (await apiLibraryMusicAlbumList()).page.list || [];
		const languageList = (await apiLibraryCommonLanguageList()).page.list || [];
		setStyle(styleList);
		setAlbum(albumList);
		setLanguage(languageList);
	};

	const value: MusicEnumContext = useMemo(
		() => ({
			style,
			album,
			language,
			setStyle,
			setAlbum,
			setLanguage,
		}),
		[style, album, language],
	);

	return <MusicEnumContext.Provider value={value}>{children}</MusicEnumContext.Provider>;
}
