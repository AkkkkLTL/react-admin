import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiLibraryCommonLanguageList, apiLibraryCommonRegionList } from "@/api/services/library-common.service";
import { apiLibraryMovieCategoryList } from "@/api/services/library-movie.service";
import { ReadStatus } from "@/types/enum";
import { type CommonLanguage, type CommonRegion, type MovieCategory, MovieType } from "../../types";

const STATUS = [
	{
		value: ReadStatus.WANTTOREAD,
		label: "想看",
	},
	{
		value: ReadStatus.UNREAD,
		label: "未看",
	},
	{
		value: ReadStatus.STOPREAD,
		label: "暂停",
	},
	{
		value: ReadStatus.READING,
		label: "在看",
	},
	{
		value: ReadStatus.GIVEUPREAD,
		label: "弃看",
	},
	{
		value: ReadStatus.READED,
		label: "已看",
	},
];

const TYPE_LIST = [
	{
		value: MovieType.MANGA,
		label: "漫剧",
	},
	{
		value: MovieType.DOCUMENTARY,
		label: "纪录片",
	},
	{
		value: MovieType.ANIMATION,
		label: "动漫",
	},
	{
		value: MovieType.TV_SERIES,
		label: "电视剧",
	},
	{
		value: MovieType.MOVIE,
		label: "电影",
	},
	{
		value: MovieType.PROGRAM,
		label: "综艺",
	},
	{
		value: MovieType.SHORT,
		label: "短剧",
	},
	{
		value: MovieType.SHORT_FILM,
		label: "短片",
	},
];

interface MovieEnumContext {
	TYPE_LIST: typeof TYPE_LIST;
	STATUS: typeof STATUS;
	category: MovieCategory[];
	language: CommonLanguage[];
	region: CommonRegion[];
	setCategory: (category: MovieCategory[]) => void;
	setLanguage: (language: CommonLanguage[]) => void;
	setRegion: (region: CommonRegion[]) => void;
}

export const MovieEnumContext = createContext<MovieEnumContext>({
	TYPE_LIST,
	STATUS,
	category: [],
	language: [],
	region: [],
	setCategory: () => {},
	setLanguage: () => {},
	setRegion: () => {},
});

export function useMovieEnumContext() {
	const context = useContext(MovieEnumContext);
	return context;
}

export default function MovieEnumProvider({ children }: PropsWithChildren) {
	const [category, setCategory] = useState<MovieCategory[]>([]);
	const [language, setLanguage] = useState<CommonLanguage[]>([]);
	const [region, setRegion] = useState<CommonRegion[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const categoryList = (await apiLibraryMovieCategoryList()).page.list || [];
		const languageList = (await apiLibraryCommonLanguageList()).page.list || [];
		const regionList = (await apiLibraryCommonRegionList()).page.list || [];
		setCategory(categoryList);
		setLanguage(languageList);
		setRegion(regionList);
	};

	const value: MovieEnumContext = useMemo(
		() => ({
			TYPE_LIST,
			STATUS,
			category,
			language,
			region,
			setCategory,
			setLanguage,
			setRegion,
		}),
		[category, language, region],
	);

	return <MovieEnumContext.Provider value={value}>{children}</MovieEnumContext.Provider>;
}
