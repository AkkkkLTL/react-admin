/**
 * 筛选数据配置上下文提供器
 */
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import {
	apiLibraryBookEnumInfo,
	type LibraryBookEnumInfoRes,
} from "@/api/services/virtual-library/library-book.service";
import type { BookCategory, BookPublisher, BookSource } from "../../types";

/**
 * 阅读状态类型
 */
type ReadStatusList = LibraryBookEnumInfoRes["data"]["readStatusList"];
/**
 * 装帧类型
 */
type BindingTypeList = LibraryBookEnumInfoRes["data"]["bindingTypeList"];
/**
 * 出版社
 */
type PublisherList = LibraryBookEnumInfoRes["data"]["publisherList"];
/**
 * 评分类型
 */
type RatingList = LibraryBookEnumInfoRes["data"]["ratingList"];
/**
 * 分类类型
 */
type CategoryList = LibraryBookEnumInfoRes["data"]["categoryList"];
/**
 * 阅读来源类型
 */
type SourceList = LibraryBookEnumInfoRes["data"]["sourceList"];

interface BookEnumContext {
	readStatusList: ReadStatusList;
	bindingTypeList: BindingTypeList;
	publisherList: PublisherList;
	ratingList: RatingList;
	categoryList: CategoryList;
	sourceList: SourceList;

	setReadStatusList: (readStatusList: ReadStatusList) => void;
	setBindingTypeList: (bindingTypeList: BindingTypeList) => void;
	setPublisherList: (publisherList: PublisherList) => void;
	setRatingList: (ratingList: RatingList) => void;
	setCategoryList: (categoryList: CategoryList) => void;
	setSourceList: (sourceList: SourceList) => void;
}

const BookEnumContext = createContext<BookEnumContext>({
	readStatusList: [],
	bindingTypeList: [],
	publisherList: [],
	ratingList: [],
	categoryList: [],
	sourceList: [],
	setReadStatusList: () => {},
	setBindingTypeList: () => {},
	setPublisherList: () => {},
	setRatingList: () => {},
	setCategoryList: () => {},
	setSourceList: () => {},
});

export function useBookEnumContext() {
	const context = useContext(BookEnumContext);
	return context;
}

export default function BookEnumProvider({ children }: PropsWithChildren) {
	const [readStatusList, setReadStatusList] = useState<ReadStatusList>([]);
	const [bindingTypeList, setBindingTypeList] = useState<BindingTypeList>([]);
	const [publisherList, setPublisherList] = useState<PublisherList>([]);
	const [ratingList, setRatingList] = useState<RatingList>([]);
	const [categoryList, setCategoryList] = useState<CategoryList>([]);
	const [sourceList, setSourceList] = useState<SourceList>([]);

	useEffect(() => {
		getEnumInfo();
	}, []);

	const getEnumInfo = async () => {
		const res = (await apiLibraryBookEnumInfo()).data;
		const readStatusList = res.readStatusList || [];
		const bindingTypeList = res.bindingTypeList || [];
		const publisherList = res.publisherList || [];
		const ratingList = res.ratingList || [];
		const categoryList = res.categoryList || [];
		const sourceList = res.sourceList || [];
		setReadStatusList(readStatusList);
		setBindingTypeList(bindingTypeList);
		setPublisherList(publisherList);
		setRatingList(ratingList);
		setCategoryList(categoryList);
		setSourceList(sourceList);
	};

	const value: BookEnumContext = useMemo(
		() => ({
			readStatusList,
			bindingTypeList,
			publisherList,
			ratingList,
			categoryList,
			sourceList,
			setReadStatusList,
			setBindingTypeList,
			setPublisherList,
			setRatingList,
			setCategoryList,
			setSourceList,
		}),
		[readStatusList, bindingTypeList, publisherList, ratingList, categoryList, sourceList],
	);

	return <BookEnumContext.Provider value={value}>{children}</BookEnumContext.Provider>;
}
