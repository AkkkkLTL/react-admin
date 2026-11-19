import { Select } from "antd";
import { CircleXIcon } from "lucide-react";
import { type KeyboardEvent, useEffect } from "react";
import { useForm, Watch } from "react-hook-form";
import type { BookListQuery } from "@/api/services/virtual-library/library-book.service";
import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import type { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { ButtonGroup } from "@/ui/button-group";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { Separator } from "@/ui/separator";
import { cn } from "@/utils";
import { useBookEnumContext } from "./book-enum-provider";

/**
 * 排序按钮组
 */
const SORT_BY = [
	{
		value: "read_status",
		label: "阅读状态",
	},
	{
		value: "publish_date",
		label: "出版时间",
	},
	{
		value: "rating",
		label: "评分",
	},
];

/**
 * 升序降序按钮组
 */
const SORT_ORDER = [
	{
		value: true,
		label: "升序",
	},
	{
		value: false,
		label: "降序",
	},
];

export interface BookFilterFormProps {
	formValue: BookListQuery;
	setTableParams: (params: BookListQuery) => void;
	onSearch: () => void;
}
export function BookFilterForm({ formValue, setTableParams, onSearch }: BookFilterFormProps) {
	const form = useForm<BookListQuery>({
		defaultValues: formValue,
	});

	const { readStatusList, publisherList, categoryList } = useBookEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const handleClearInput = () => {
		form.setValue("keyword", "");
		if (formValue.keyword?.trim() !== "") {
			onSubmit();
		}
	};

	const handleReadStatusChange = (value: ReadStatus | "") => {
		form.setValue("readStatus", value);
		onSubmit();
	};

	const handlePublisherIdChange = (value: number | "") => {
		form.setValue("publisherId", value);
		onSubmit();
	};

	const handleCategoryIdChange = (value: number | "") => {
		form.setValue("categoryId", value);
		onSubmit();
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		e.preventDefault();
	};

	const handleInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		const keyword = form.getValues("keyword");
		if (keyword && keyword.trim() !== "") onSubmit();
	};

	const onSubmit = () => {
		const values = form.getValues();
		const keyword = values.keyword?.replace(/[\t\r\f\n\s]/g, "");
		form.setValue("keyword", keyword);
		setTableParams({
			...values,
			keyword,
			page: 1,
		});
		onSearch();
	};

	const onReset = () => {
		const resetValues = { page: 1, limit: formValue.limit, sortField: "read_status", asc: true } as BookListQuery;
		form.reset(resetValues);
		setTableParams(resetValues);
		onSearch();
	};

	return (
		<Form {...form}>
			<form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4 px-6 pb-4">
				{/* 搜索与筛选 */}
				<div
					className="grid gap-4 grid-rows-1 w-full"
					style={{
						gridTemplateColumns: "1fr 200px 200px 150px 40px",
					}}
				>
					{/* 书籍搜索：1.输入内容后回车触发搜索，2.点击清除按钮触发搜索 */}
					<FormField
						control={form.control}
						name="keyword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputGroup>
										<InputGroupInput
											type="text"
											{...field}
											placeholder="搜索书名、作者或 ISBN"
											onKeyDown={handleInputKeyDown}
											onKeyUp={handleInputKeyUp}
										/>
										<InputGroupAddon>
											<Icon icon="local:ic-search" size={16} />
										</InputGroupAddon>
										<InputGroupAddon align={"inline-end"}>
											<Button
												type="button"
												variant={"ghost"}
												size={"icon"}
												onClick={() => field.value && handleClearInput()}
												className={cn(
													"text-muted-foreground hover:bg-transparent",
													field.value ? "visible" : "invisible",
												)}
											>
												<CircleXIcon />
												<span className="sr-only">Clear input</span>
											</Button>
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 阅读状态 */}
					<FormField
						control={form.control}
						name="readStatus"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										{...field}
										allowClear
										classNames={{
											content: "text-sm",
										}}
										labelRender={(option) => <>阅读状态：{option.label}</>}
										options={[{ label: "全部", value: "" }, ...readStatusList]}
										onChange={handleReadStatusChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 出版社 */}
					<FormField
						control={form.control}
						name="publisherId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										{...field}
										allowClear
										classNames={{
											content: "text-sm",
										}}
										showSearch={{ optionFilterProp: "label" }}
										labelRender={(option) => <>出版社：{option.label}</>}
										options={[{ label: "全部", value: "" }, ...publisherList]}
										onChange={handlePublisherIdChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 分类 */}
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										{...field}
										allowClear
										classNames={{
											content: "text-sm",
										}}
										showSearch={{ optionFilterProp: "label" }}
										labelRender={(option) => <>分类：{option.label}</>}
										options={[{ label: "全部", value: "" }, ...categoryList]}
										onChange={handleCategoryIdChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 重置筛选按钮 */}
					<Button
						type="button"
						className="shadow-none bg-transparent hover:bg-transparent cursor-pointer flex flex-row gap-1 items-center p-0"
						onClick={onReset}
					>
						<Icon icon="material-symbols:refresh-rounded" size={16} color={themeVars.colors.palette.gray[500]} />
						<span className="text-sm text-gray-500">重置</span>
					</Button>
				</div>

				{/* 排序设置 */}
				<div className="flex flex-row w-full justify-between items-center">
					{/* 排序字段与方向 */}
					<div className="flex flex-row items-center gap-3">
						{/* 排序说明 */}
						<div className="flex flex-row gap-1">
							<Watch
								control={form.control}
								name="asc"
								render={(asc) => (
									<>
										{asc ? (
											<Icon icon="solar:sort-from-bottom-to-top-outline" size={16} />
										) : (
											<Icon icon="solar:sort-from-top-to-bottom-outline" size={16} />
										)}
									</>
								)}
							/>
							<span className="text-sm text-gray-500">排序</span>
						</div>
						{/* 排序字段选择 */}
						<FormField
							control={form.control}
							name="sortField"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-row gap-1">
											<ButtonGroup aria-label="Section">
												{SORT_BY.map((item) => (
													<Button
														aria-pressed={field.value === item.value}
														key={item.value}
														onClick={() => {
															field.onChange(item.value);
															onSubmit();
														}}
														value={item.value}
														className={cn(
															"cursor-pointer shadow-none",
															field.value === item.value
																? "text-primary bg-primary/10 hover:bg-primary/10"
																: "bg-transparent text-gray-500 hover:bg-transparent",
														)}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						{/* 分割线 */}
						<Separator orientation="vertical" />
						{/* 排序方向选择 */}
						<FormField
							control={form.control}
							name="asc"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-row gap-1">
											<ButtonGroup aria-label="Section">
												{SORT_ORDER.map((item) => (
													<Button
														aria-pressed={field.value === item.value}
														key={item.value ? "asc" : "desc"}
														onClick={() => {
															field.onChange(item.value);
															onSubmit();
														}}
														className={cn(
															"cursor-pointer shadow-none gap-1",
															field.value === item.value
																? "text-primary bg-primary/10 hover:bg-primary/10"
																: "bg-transparent text-gray-500 hover:bg-transparent",
														)}
													>
														{item.value ? (
															<Icon icon="material-symbols:fitbit-arrow-upward-rounded" size={16} />
														) : (
															<Icon icon="material-symbols:fitbit-arrow-downward-rounded" size={16} />
														)}
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					{/* 排序标签 */}
					<Watch
						control={form.control}
						name={["sortField", "asc"]}
						render={([sortField, asc]) => (
							<span className="text-sm text-gray-500">
								当前：
								{sortField === SORT_BY[0].value && (asc ? "阅读状态 · 未读优先" : "阅读状态 · 已读优先")}
								{sortField === SORT_BY[1].value && (asc ? "出版时间 · 从旧到新" : "出版时间 · 从新到旧")}
								{sortField === SORT_BY[2].value && (asc ? "评分 · 从低到高" : "评分 · 从高到低")}
							</span>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}
