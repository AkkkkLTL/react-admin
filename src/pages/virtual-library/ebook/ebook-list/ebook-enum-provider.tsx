import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import {
	apiLibraryEBookEnumInfo,
	type LibraryEBookEnumInfoRes,
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
	publishPlatform: LibraryEBookEnumInfoRes["publishPlatformList"];
	category: LibraryEBookEnumInfoRes["categoryList"];
	setPublishPlatform: (publishPlatform: LibraryEBookEnumInfoRes["publishPlatformList"]) => void;
	setCategory: (category: LibraryEBookEnumInfoRes["categoryList"]) => void;
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
	const [publishPlatform, setPublishPlatform] = useState<LibraryEBookEnumInfoRes["publishPlatformList"]>([]);
	const [category, setCategory] = useState<LibraryEBookEnumInfoRes["categoryList"]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const res = await apiLibraryEBookEnumInfo();
		setPublishPlatform(res.publishPlatformList || []);
		setCategory(res.categoryList || []);
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
