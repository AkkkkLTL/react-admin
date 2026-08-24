import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import {
	apiLibraryEBookCategoryList,
	apiLibraryEBookPublishPlatformList,
	type LibraryEBookCategoryListRes,
	type LibraryEBookPublishplatformListRes,
} from "@/api/services/library-ebook.service";
import { ReadStatus } from "@/types/enum";

const READ_STATUS = [
	{
		value: ReadStatus.WANTTOREAD,
		label: "想读",
	},
	{
		value: ReadStatus.UNREAD,
		label: "未读",
	},
	{
		value: ReadStatus.STOPREAD,
		label: "暂停",
	},
	{
		value: ReadStatus.READING,
		label: "在读",
	},
	{
		value: ReadStatus.GIVEUPREAD,
		label: "弃读",
	},
	{
		value: ReadStatus.READED,
		label: "已读",
	},
];

const TYPE_LIST = [
	{
		value: 0,
		label: "小说",
	},
	{
		value: 1,
		label: "漫画",
	},
];

interface EBookEnumContext {
	TYPE_LIST: typeof TYPE_LIST;
	READ_STATUS: typeof READ_STATUS;
	publishPlatform: LibraryEBookPublishplatformListRes["page"]["list"];
	category: LibraryEBookCategoryListRes["page"]["list"];
	setPublishPlatform: (publishPlatform: LibraryEBookPublishplatformListRes["page"]["list"]) => void;
	setCategory: (category: LibraryEBookCategoryListRes["page"]["list"]) => void;
}

const EBookEnumContext = createContext<EBookEnumContext>({
	TYPE_LIST,
	READ_STATUS,
	publishPlatform: [],
	category: [],
	setPublishPlatform: () => {},
	setCategory: () => {},
});

export function useEBookEnumContext() {
	const context = useContext(EBookEnumContext);
	return context;
}

export default function EBookEnumProvider({ children }: PropsWithChildren) {
	const [publishPlatform, setPublishPlatform] = useState<LibraryEBookPublishplatformListRes["page"]["list"]>([]);
	const [category, setCategory] = useState<LibraryEBookCategoryListRes["page"]["list"]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const publishPlatformList = (await apiLibraryEBookPublishPlatformList()).page.list || [];
		const categoryList = (await apiLibraryEBookCategoryList()).page.list || [];
		setPublishPlatform(publishPlatformList);
		setCategory(categoryList);
	};

	const value: EBookEnumContext = useMemo(
		() => ({
			TYPE_LIST,
			READ_STATUS,
			publishPlatform,
			category,
			setPublishPlatform,
			setCategory,
		}),
		[publishPlatform, category],
	);

	return <EBookEnumContext.Provider value={value}>{children}</EBookEnumContext.Provider>;
}
