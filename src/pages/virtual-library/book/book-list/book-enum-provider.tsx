/**
 * 筛选数据配置上下文提供器
 */

import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import {
	apiLibraryBookCategoryList,
	apiLibraryBookPublisherList,
	apiLibraryBookSourceList,
	type LibraryBookCategoryListRes,
	type LibraryBookPublisherListRes,
	type LibraryBookSourceListRes,
} from "@/api/services/library-book.service";

interface BookEnumContext {
	publisher: LibraryBookPublisherListRes["page"]["list"];
	category: LibraryBookCategoryListRes["page"]["list"];
	source: LibraryBookSourceListRes["page"]["list"];
	setPublisher: (publisher: LibraryBookPublisherListRes["page"]["list"]) => void;
	setCategory: (category: LibraryBookCategoryListRes["page"]["list"]) => void;
	setSource: (source: LibraryBookSourceListRes["page"]["list"]) => void;
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
	const [publisher, setPublisher] = useState<LibraryBookPublisherListRes["page"]["list"]>([]);
	const [category, setCategory] = useState<LibraryBookCategoryListRes["page"]["list"]>([]);
	const [source, setSource] = useState<LibraryBookSourceListRes["page"]["list"]>([]);

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
