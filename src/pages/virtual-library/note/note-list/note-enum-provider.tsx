import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiLibraryNotePlatformList } from "@/api/services/library-note.service";
import { type NotePlatform, NoteType } from "../../types";

const NOTE_TYPE = [
	{
		value: NoteType.ELECTRONIC,
		label: "电子笔记",
	},
	{
		value: NoteType.PHYSICAL_NOTE,
		label: "纸质笔记",
	},
];

interface NoteEnumContext {
	noteType: typeof NOTE_TYPE;
	platform: NotePlatform[];
	setPlatform: (platform: NotePlatform[]) => void;
}

const NoteEnumContext = createContext<NoteEnumContext>({
	noteType: NOTE_TYPE,
	platform: [],
	setPlatform: () => {},
});

export function useNoteEnumContext() {
	const context = useContext(NoteEnumContext);
	return context;
}

export default function NoteEnumProvider({ children }: PropsWithChildren) {
	const [platform, setPlatform] = useState<NotePlatform[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const platformList = (await apiLibraryNotePlatformList()).page.list || [];
		setPlatform(platformList);
	};

	const value: NoteEnumContext = useMemo(
		() => ({
			noteType: NOTE_TYPE,
			platform,
			setPlatform,
		}),
		[platform],
	);

	return <NoteEnumContext.Provider value={value}>{children}</NoteEnumContext.Provider>;
}
