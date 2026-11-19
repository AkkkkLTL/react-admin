import { DatePicker, Rate, Select, Steps } from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookCategorySave,
	apiLibraryBookCheck,
	apiLibraryBookEnumInfo,
	apiLibraryBookPublisherSave,
	apiLibraryBookSave,
	apiLibraryBookSourceSave,
	apiLibraryBookUpdate,
	type LibraryBookCheckQuery,
	type LibraryBookEnumQuery,
	type LibraryBookSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { Icon } from "@/components/icon";
import NameListField from "@/components/name-list-field";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { cn, toURLSearchParams } from "@/utils";
import type { BookCategory, BookPublisher, BookSource } from "../../types";
import { useBookEnumContext } from "./book-enum-provider";

export interface BookModalProps {
	formValue: LibraryBookSaveReq;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

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

export function BookModal({ formValue, title, show, onOk, onCancel }: BookModalProps) {
	const [step, setStep] = useState<number>(0);
	// 名单（作者/译者）行内编辑进行中标记，编辑时拦截 Esc 避免直接关闭弹窗丢失改动
	const nameEditingRef = useRef(false);
	// Publisher
	const [publisherSearch, setPublisherSearch] = useState("");
	// Category
	const [categorySearch, setCategorySearch] = useState("");
	// Source
	const [sourceSearch, setSourceSearch] = useState("");
	const {
		readStatusList,
		publisherList,
		bindingTypeList,
		categoryList,
		sourceList,
		setPublisherList,
		setCategoryList,
		setSourceList,
	} = useBookEnumContext();

	const form = useForm<LibraryBookSaveReq>({
		defaultValues: formValue,
	});

	const authorsField = useFieldArray({
		name: "authors",
		control: form.control,
	});

	const translatorsField = useFieldArray({
		name: "translators",
		control: form.control,
	});

	const getPublisherList = async () => {
		const res = (await apiLibraryBookEnumInfo(toURLSearchParams<LibraryBookEnumQuery>({ moduleType: "publisher" })))
			.data.publisherList;
		setPublisherList(res);
	};

	const getCategoryList = async () => {
		const res = (await apiLibraryBookEnumInfo(toURLSearchParams<LibraryBookEnumQuery>({ moduleType: "category" }))).data
			.categoryList;
		setCategoryList(res);
	};

	const getSourceList = async () => {
		const res = (await apiLibraryBookEnumInfo(toURLSearchParams<LibraryBookEnumQuery>({ moduleType: "source" }))).data
			.sourceList;
		setSourceList(res);
	};

	const onSaveBookPublisher = async (values: BookPublisher) => {
		await apiLibraryBookPublisherSave(values);
		await getPublisherList();
	};

	const onSaveBookCategory = async (values: BookCategory) => {
		await apiLibraryBookCategorySave(values);
		await getCategoryList();
	};

	const onSaveBookSource = async (values: BookSource) => {
		await apiLibraryBookSourceSave(values);
		await getSourceList();
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

	const onSourceChange = (value: number[]) => {
		setSourceSearch("");
		form.setValue("sourceIds", value);
	};

	const onStepChange = (value: number) => {
		setStep(value);
	};

	const handleAuthorFieldRemove = (index: number) => {
		const authorId = form.getValues(`authors.${index}`)?.id;
		const deleteAuthorIds = form.getValues("deleteAuthorIds") || [];
		authorsField.remove(index);
		if (authorId !== undefined) {
			form.setValue("deleteAuthorIds", [...deleteAuthorIds, authorId]);
		}
	};

	const handleTranslatorFieldRemove = (index: number) => {
		const translatorId = form.getValues(`translators.${index}`)?.id;
		const deleteTranslatorIds = form.getValues("deleteTranslatorIds") || [];
		translatorsField.remove(index);
		if (translatorId !== undefined) {
			form.setValue("deleteTranslatorIds", [...deleteTranslatorIds, translatorId]);
		}
	};

	const onSubmit = async (values: LibraryBookSaveReq) => {
		// 处理空值
		for (const [key, value] of Object.entries(values)) {
			if (value === undefined || value === "") {
				delete values[key as keyof LibraryBookSaveReq];
			}
		}

		if (values.id !== undefined) {
			await apiLibraryBookUpdate(values);
		} else {
			await apiLibraryBookSave(values);
		}
		onOk();
	};

	const handleNextStep = async () => {
		const isValid = await form.trigger("isbn");
		if (isValid) {
			// 验证ISBN是否重复
			const isRepeat = (
				await apiLibraryBookCheck(toURLSearchParams<LibraryBookCheckQuery>({ isbn: form.getValues("isbn") }))
			).data;
			if (isRepeat) {
				form.setError("isbn", { message: "ISBN 已存在" });
			} else {
				setStep(1);
			}
		}
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	useEffect(() => {
		if (show) {
			nameEditingRef.current = false;
			formValue.id !== undefined ? setStep(1) : setStep(0);
		}
	}, [show]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent
				onEscapeKeyDown={(e) => {
					// 行内编辑名单时，Esc 仅取消该项编辑，不关闭整个弹窗
					if (nameEditingRef.current) e.preventDefault();
				}}
				className={cn(
					"gap-0 overflow-hidden p-0 transition-all duration-300 ease-in-out grid-rows-[auto_auto_1fr_auto] [&>:last-child]:hidden",
					step === 0 ? "h-[480px] w-full max-w-2xl" : "h-[calc(100vh-5rem)] min-w-[calc(100vw-5rem)]",
				)}
			>
				<DialogHeader className="space-y-0 flex-row items-start justify-between border-b border-primary/10 px-6 py-4">
					<div className="flex flex-col gap-1.5">
						<span className="text-sm font-semibold tracking-[0.2em] text-primary">
							{formValue.id !== undefined ? "EDIT COLLECTION" : "NEW COLLECTION"}
						</span>
						<DialogTitle className="text-xl">{title}</DialogTitle>
					</div>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="contents">
						<Steps
							current={step}
							onChange={onStepChange}
							classNames={{
								itemTitle: "text-sm text-gray-500",
							}}
							className="w-full justify-self-center max-w-2xl py-2 [&_.ant-steps-item-process_.ant-steps-item-title]:text-primary!"
							titlePlacement="vertical"
							items={[
								{
									title: "验证 ISBN",
									disabled: true,
								},
								{
									title: "完善信息",
									disabled: true,
								},
							]}
						/>
						{step === 0 && (
							<div
								key="step-isbn"
								className="animate-in fade-in-0 slide-in-from-bottom-3 flex flex-col items-center justify-center gap-6 px-6 duration-300"
							>
								<div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
									<Icon
										icon="material-symbols:book-2-outline-rounded"
										size={35}
										color={themeVars.colors.palette.primary.default}
									/>
								</div>
								<div className="flex flex-col items-center gap-1.5">
									<span className="text-lg font-medium">先从 ISBN 开始</span>
									<span className="text-sm text-gray-500">输入书籍 ISBN，我们将帮你快速建立藏书信息。</span>
								</div>
								<FormField
									control={form.control}
									name="isbn"
									rules={{
										required: "请输入 ISBN",
										validate: (value) => value.length === 13 || value.length === 10 || "ISBN 需为 10 或 13 位",
									}}
									render={({ field }) => (
										<FormItem className="w-full max-w-sm">
											<FormLabel className="text-xs text-gray-500">ISBN</FormLabel>
											<FormControl>
												<Input {...field} placeholder="请输入 10 或 13 位 ISBN" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="button" onClick={handleNextStep} className="bg-primary text-white hover:bg-primary-dark">
									下一步
								</Button>
							</div>
						)}

						{step === 1 && (
							<div
								key="step-detail"
								className="no-scrollbar animate-in fade-in-0 slide-in-from-bottom-3 overflow-y-auto px-6 py-5 duration-300"
							>
								<div className="grid grid-cols-2 gap-x-6 gap-y-4">
									<FormField
										control={form.control}
										name="isbn"
										render={({ field }) => (
											<FormItem className="cursor-not-allowed" aria-disabled>
												<FormLabel className="text-xs text-gray-500">ISBN</FormLabel>
												<FormControl>
													<Input {...field} disabled readOnly unselectable="on" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="title"
										rules={{ required: "请输入标题" }}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">
													标题<span className="text-red-500">*</span>
												</FormLabel>
												<FormControl>
													<Input
														className="bg-white md:text-base hover:border-primary"
														{...field}
														placeholder="请输入纸质书标题"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="originalTitle"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">原标题</FormLabel>
												<FormControl>
													<Input className="bg-white" {...field} placeholder="选填" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="authors"
										render={() => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">作者 / 创作者</FormLabel>
												<FormControl>
													<NameListField
														names={authorsField.fields}
														placeholder="输入后回车添加"
														editingRef={nameEditingRef}
														onAdd={(name) => authorsField.append({ name })}
														onChange={(index, name) =>
															authorsField.update(index, { ...form.getValues(`authors.${index}`), name })
														}
														onRemove={handleAuthorFieldRemove}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="categoryId"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">分类</FormLabel>
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
														placeholder="请选择分类"
														notFoundContent={
															<div className="space-y-2">
																<p>选择或创建新分类</p>
																{categorySearch && (
																	<Button
																		type="button"
																		variant={"outline"}
																		onClick={() => onSaveBookCategory({ name: categorySearch })}
																	>
																		创建 <Badge>{categorySearch}</Badge>
																	</Button>
																)}
															</div>
														}
														options={categoryList}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="readStatus"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">阅读状态</FormLabel>
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
														placeholder="请选择阅读状态"
														options={readStatusList}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="sourceIds"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">来源</FormLabel>
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
														placeholder="请选择来源"
														notFoundContent={
															<div className="space-y-2">
																<p>选择或创建新来源</p>
																{sourceSearch && (
																	<Button
																		type="button"
																		variant={"outline"}
																		onClick={() => onSaveBookSource({ name: sourceSearch })}
																	>
																		创建 <Badge>{sourceSearch}</Badge>
																	</Button>
																)}
															</div>
														}
														options={sourceList}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="publisherId"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">出版社</FormLabel>
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
														showSearch={{ optionFilterProp: "label", onSearch: onPublisherSearch }}
														onChange={onPublisherChange}
														placeholder="请选择出版社"
														notFoundContent={
															<div className="space-y-2">
																<p>选择或创建新出版社</p>
																{publisherSearch && (
																	<Button
																		type="button"
																		variant={"outline"}
																		onClick={() => onSaveBookPublisher({ name: publisherSearch })}
																	>
																		创建 <Badge>{publisherSearch}</Badge>
																	</Button>
																)}
															</div>
														}
														options={publisherList}
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
												<FormLabel className="text-xs text-gray-500">出版日期</FormLabel>
												<FormControl>
													<DatePicker
														{...field}
														classNames={{
															root: "rounded-lg",
														}}
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
										name="binding"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">装帧</FormLabel>
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
														placeholder="请选择装帧"
														options={bindingTypeList}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="edition"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">版次</FormLabel>
												<FormControl>
													<Input type="number" className="bg-white" {...field} placeholder="选填" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="pages"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">页数</FormLabel>
												<FormControl>
													<Input type="number" className="bg-white" {...field} placeholder="选填" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="currency"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">币种</FormLabel>
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
														placeholder="请选择币种"
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
												<FormLabel className="text-xs text-gray-500">价格</FormLabel>
												<FormControl>
													<Input type="number" className="bg-white" {...field} placeholder="选填" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="translators"
										render={() => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">译者</FormLabel>
												<FormControl>
													<NameListField
														names={translatorsField.fields}
														placeholder="输入后回车添加"
														editingRef={nameEditingRef}
														onAdd={(name) => translatorsField.append({ name })}
														onChange={(index, name) =>
															translatorsField.update(index, { ...form.getValues(`translators.${index}`), name })
														}
														onRemove={handleTranslatorFieldRemove}
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
												<FormLabel className="text-xs text-gray-500">评分</FormLabel>
												<FormControl>
													<Rate {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="cover"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-gray-500">封面链接</FormLabel>
												<FormControl>
													<Input {...field} className="bg-white" placeholder="选填" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="overview"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel className="text-xs text-gray-500">补充说明</FormLabel>
												<FormControl>
													<Textarea {...field} className="bg-white" placeholder="记录一些关于它的信息…" />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						{step === 1 && (
							<DialogFooter className="flex-row justify-end gap-2 border-t border-success-dark/10 px-6 py-4">
								<Button type="button" variant={"outline"} onClick={onCancel}>
									取消
								</Button>
								<Button type="submit" className="bg-primary text-white hover:bg-primary-dark">
									加入收藏
								</Button>
							</DialogFooter>
						)}
					</form>
				</Form>

				<DialogClose className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary-dark hover:text-white">
					<X className="size-4" />
					<span className="sr-only">关闭</span>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
