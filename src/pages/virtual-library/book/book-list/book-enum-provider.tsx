/**
 * 筛选数据配置上下文提供器
 */
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import {
	apiLibraryBookCategoryList,
	apiLibraryBookPublisherList,
	apiLibraryBookSourceList,
} from "@/api/services/library-book.service";
import type { BookCategory, BookPublisher, BookSource } from "../../types";

interface BookEnumContext {
	publisher: BookPublisher[];
	category: BookCategory[];
	source: BookSource[];
	setPublisher: (publisher: BookPublisher[]) => void;
	setCategory: (category: BookCategory[]) => void;
	setSource: (source: BookSource[]) => void;
}

const BookEnumContext = createContext<BookEnumContext>({
	publisher: [],
	category: [],
	source: [],
	setPublisher: () => {},
	setCategory: () => {},
	setSource: () => {},
});

export function useBookEnumContext() {
	const context = useContext(BookEnumContext);
	return context;
}

export default function BookEnumProvider({ children }: PropsWithChildren) {
	const [publisher, setPublisher] = useState<BookPublisher[]>([]);
	const [category, setCategory] = useState<BookCategory[]>([]);
	const [source, setSource] = useState<BookSource[]>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const publisherList = (await apiLibraryBookPublisherList()).page.list || [];
		const categoryList = (await apiLibraryBookCategoryList()).page.list || [];
		const sourceList = (await apiLibraryBookSourceList()).page.list || [];
		setPublisher(publisherList);
		setCategory(categoryList);
		setSource(sourceList);
	};

	const value: BookEnumContext = useMemo(
		() => ({
			publisher,
			category,
			source,
			setPublisher,
			setCategory,
			setSource,
		}),
		[publisher, category, source],
	);

	return <BookEnumContext.Provider value={value}>{children}</BookEnumContext.Provider>;
}
