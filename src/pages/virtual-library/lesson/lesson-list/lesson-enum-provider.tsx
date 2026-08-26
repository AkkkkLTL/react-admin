import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiLibraryLessonSourceList } from "@/api/services/library-lesson.service";
import { ReadStatus } from "@/types/enum";
import type { LessonSource } from "../../types";

const STATUS = [
	{
		value: ReadStatus.WANTTOREAD,
		label: "想学",
	},
	{
		value: ReadStatus.UNREAD,
		label: "待学",
	},
	{
		value: ReadStatus.STOPREAD,
		label: "暂停",
	},
	{
		value: ReadStatus.READING,
		label: "学习中",
	},
	{
		value: ReadStatus.GIVEUPREAD,
		label: "已放弃",
	},
	{
		value: ReadStatus.READED,
		label: "已学完",
	},
];

interface LessonEnumContext {
	STATUS: typeof STATUS;
	source: LessonSource[];
	setSource: (source: LessonSource[]) => void;
}

const LessonEnumContext = createContext<LessonEnumContext>({
	STATUS,
	source: [],
	setSource: () => {},
});

export function useLessonEnumContext() {
	const context = useContext(LessonEnumContext);
	return context;
}

export default function LessonEnumProvider({ children }: PropsWithChildren) {
	const [source, setSource] = useState<LessonSource[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const sourceList = (await apiLibraryLessonSourceList()).page.list || [];
		setSource(sourceList);
	};

	const value: LessonEnumContext = useMemo(
		() => ({
			STATUS,
			source,
			setSource,
		}),
		[source],
	);

	return <LessonEnumContext.Provider value={value}>{children}</LessonEnumContext.Provider>;
}
