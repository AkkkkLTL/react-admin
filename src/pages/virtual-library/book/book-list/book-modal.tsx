import { DatePicker, Rate, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookCategoryList,
	apiLibraryBookCategorySave,
	apiLibraryBookPublisherList,
	apiLibraryBookPublisherSave,
	apiLibraryBookSave,
	apiLibraryBookSourceList,
	apiLibraryBookSourceSave,
	apiLibraryBookUpdate,
	type LibraryBookCategoryListRes,
	type LibraryBookCategorySaveReq,
	type LibraryBookPublisherListRes,
	type LibraryBookPublisherSaveReq,
	type LibraryBookSaveReq,
	type LibraryBookSourceListRes,
	type LibraryBookSourceSaveReq,
} from "@/api/services/library-book.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import type { BookFormType } from "./index";

export interface BookModalProps {
	formValue: BookFormType;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

const BOOK_BINDING = [
	{
		value: 1,
		label: "平装",
	},
	{
		value: 2,
		label: "精装",
	},
	{
		value: 3,
		label: "线胶装",
	},
];

const CURRENY = [
	{
		value: "CNY",
		label: "CNY",
	},
	{
		value: "USD",
		label: "USD",
	},
];

const BOOK_STATUS = [
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

const formatDate = (date: Date | undefined) => {
	if (!date) {
		return "";
	}
	return date
		.toLocaleDateString("zh-CN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
		.replace(/\//g, "-");
};

const isValidDate = (date: Date | undefined) => {
	if (!date) {
		return false;
	}
	return !Number.isNaN(date.getTime());
};

export function BookModal({ formValue, title, show, onOk, onCancel }: BookModalProps) {
	// Publisher
	const [publisherSearch, setPublisherSearch] = useState("");
	const [publisherList, setPublisherList] = useState<LibraryBookPublisherListRes["page"]["list"]>([]);
	// Category
	const [categorySearch, setCategorySearch] = useState("");
	const [categoryList, setCategoryList] = useState<LibraryBookCategoryListRes["page"]["list"]>([]);
	// Source
	const [sourceSearch, setSourceSearch] = useState("");
	const [sourceList, setSourceList] = useState<LibraryBookSourceListRes["page"]["list"]>([]);
	// Publish Date
	// const [publishDatePanelOpen, setPublishDatePanelOpen] = useState(false);
	// const [publishDate, setPublishDate] = useState<Date | undefined>(new Date(formValue.publishDate || "2025-06-01"));
	// const [publishMonth, setPublishMonth] = useState<Date | undefined>(publishDate);

	const form = useForm<BookFormType>({
		defaultValues: formValue,
	});

	const authorField = useFieldArray({
		name: "author",
		control: form.control,
	});

	const translatorField = useFieldArray({
		name: "translator",
		control: form.control,
	});

	useEffect(() => {
		// 初始化出版社列表
		getPublisherDataList();
		// 初始化分类列表
		getCategoryDataList();
		// 初始化来源列表
		getSourceDataList();
	}, []);

	const getPublisherDataList = async () => {
		const publisherDataList = (await apiLibraryBookPublisherList()).page.list;
		setPublisherList(publisherDataList);
	};

	const getCategoryDataList = async () => {
		const categoryDataList = (await apiLibraryBookCategoryList()).page.list;
		setCategoryList(categoryDataList);
	};

	const getSourceDataList = async () => {
		const sourceDataList = (await apiLibraryBookSourceList()).page.list;
		setSourceList(sourceDataList);
	};

	const onSaveBookPublisher = async (values: LibraryBookPublisherSaveReq) => {
		await apiLibraryBookPublisherSave(values);
		await getPublisherDataList();
	};

	const onSaveBookCategory = async (values: LibraryBookCategorySaveReq) => {
		await apiLibraryBookCategorySave(values);
		await getCategoryDataList();
	};

	const onSaveBookSource = async (values: LibraryBookSourceSaveReq) => {
		await apiLibraryBookSourceSave(values);
		await getSourceDataList();
	};

	const onPublisherSearch = (value: string) => {
		setPublisherSearch(value);
	};

	const onCategorySearch = (value: string) => {
		setCategorySearch(value);
	};

	const onSourceSearch = (value: string) => {
		setSourceSearch(value);
	};

	const onPublisherChange = (value: number) => {
		setPublisherSearch("");
		form.setValue("publisherId", value);
	};

	const onCategoryChange = (value: number) => {
		setCategorySearch("");
		form.setValue("categoryId", value);
	};

	const onSourceChange = (value: string) => {
		setSourceSearch("");
		form.setValue("sourceId", value);
	};

	const onSubmit = async (values: BookFormType) => {
		const { author, translator, ...rest } = values;

		const newValues = {
			...rest,
			authorId: author?.map((item) => item.id).join(","),
			authorName: author?.map((item) => item.name).join(","),
			translatorId: translator?.map((item) => item.id).join(","),
			translatorName: translator?.map((item) => item.name).join(","),
		} as LibraryBookSaveReq;

		if (newValues.id) {
			await apiLibraryBookUpdate(newValues);
		} else {
			await apiLibraryBookSave(newValues);
		}
		// Object.values(newValues).forEach((value) => {
		// 	if (typeof value === "undefined" || value === "") {
		// 		value = null;
		// 	}
		// });

		// newValues = JSON.parse(JSON.stringify(newValues).replace(/""/g, "null"));
		console.log(newValues);
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent className="h-[90%]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="isbn"
								rules={{
									required: "ISBN is required",
									validate: (value) =>
										value.length === 13 || value.length === 10 || "ISBN must be 13 or 10 digits long",
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>ISBN</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="title"
								rules={{ required: "Title is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="oriTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Original Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="cover"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<p>Author</p>
								{authorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`author.${index}.name`}
										rules={{ required: "Author name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Author {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Author" />
														<Button type="button" onClick={() => authorField.remove(index)}>
															<Icon icon="material-symbols:remove-rounded" />
														</Button>
													</div>
												</FormControl>
												<FormMessage className="col-span-4" />
											</FormItem>
										)}
									/>
								))}
								<Button
									type="button"
									style={{ width: "100%" }}
									onClick={() => authorField.append({ id: "-1", name: "" })}
								>
									Add Author
								</Button>
							</div>

							<div className="space-y-2">
								<p>Translator</p>
								{translatorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`translator.${index}.name`}
										rules={{ required: "Translator name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Translator {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Translator" />
														<Button type="button" onClick={() => translatorField.remove(index)}>
															<Icon icon="material-symbols:remove-rounded" />
														</Button>
													</div>
												</FormControl>
												<FormMessage className="col-span-4" />
											</FormItem>
										)}
									/>
								))}
								<Button
									type="button"
									style={{ width: "100%" }}
									onClick={() => translatorField.append({ id: "-1", name: "" })}
								>
									Add Translator
								</Button>
							</div>

							<FormField
								control={form.control}
								name="publisherId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Publisher</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onPublisherSearch }}
												onChange={onPublisherChange}
												placeholder="Select Publisher"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{publisherSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveBookPublisher({ name: publisherSearch })}
															>
																Create <Badge>{publisherSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={publisherList.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="publishDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Publisher Date</FormLabel>
										<FormControl>
											<DatePicker
												{...field}
												value={dayjs(field.value || "2025-06-01")}
												onChange={(_, dateString) => {
													form.setValue("publishDate", dateString || "");
												}}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Content</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="edition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Edition</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="binding"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Binding</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												placeholder="Select Binding"
												options={BOOK_BINDING}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="pages"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pages</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Currency</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												placeholder="Select Currency"
												options={CURRENY}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onCategorySearch }}
												onChange={onCategoryChange}
												placeholder="Select Category"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{categorySearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveBookCategory({ name: categorySearch })}
															>
																Create <Badge>{categorySearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={categoryList.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="sourceId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sources</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onSourceSearch }}
												onChange={onSourceChange}
												placeholder="Select Sources"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{sourceSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveBookSource({ name: sourceSearch })}
															>
																Create <Badge>{sourceSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={sourceList.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												placeholder="Select Status"
												options={BOOK_STATUS}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rating"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rating</FormLabel>
										<FormControl>
											<Rate {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							{/* todo:待定-后期添加 */}
							<FormField
								control={form.control}
								name="noteBookId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Note Book ID</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							{/* todo:待定-后期添加 */}
							<FormField
								control={form.control}
								name="tagId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tag ID</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button type="button" variant={"outline"} onClick={onCancel}>
									Cancel
								</Button>
								<Button type="submit" variant={"default"}>
									Confirm
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
