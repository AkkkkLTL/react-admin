import { DatePicker, Rate, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryGameCategoryList,
	apiLibraryGameCategorySave,
	apiLibraryGamePlatformList,
	apiLibraryGamePlatformSave,
	apiLibraryGameSave,
	apiLibraryGameSeriesList,
	apiLibraryGameSeriesSave,
	apiLibraryGameUpdate,
	type LibraryGameSaveReq,
} from "@/api/services/library-game.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { Game, GameCategory, GamePlatform, GameSeries } from "../../types";
import { useGameEnumContext } from "./game-enum-provider";

export interface GameModalProps {
	formValue: Game;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function GameModal({ formValue, title, show, onOk, onCancel }: GameModalProps) {
	const [categorySearch, setCategorySearch] = useState("");
	const [platformSearch, setPlatformSearch] = useState("");
	const [seriesSearch, setSeriesSearch] = useState("");
	const {
		category: categoryList,
		platform: platformList,
		series: seriesList,
		setCategory: setCategoryList,
		setPlatform: setPlatformList,
		setSeries: setSeriesList,
	} = useGameEnumContext();

	const form = useForm<Game>({
		defaultValues: formValue,
	});

	const developerField = useFieldArray({
		name: "developer",
		control: form.control,
	});

	const publisherField = useFieldArray({
		name: "publisher",
		control: form.control,
	});

	const onSaveGameCategory = async (values: GameCategory) => {
		await apiLibraryGameCategorySave(values);
		const dataList = (await apiLibraryGameCategoryList()).page.list || [];
		setCategoryList(dataList);
	};

	const onSaveGamePlatform = async (values: GamePlatform) => {
		await apiLibraryGamePlatformSave(values);
		const dataList = (await apiLibraryGamePlatformList()).page.list || [];
		setPlatformList(dataList);
	};

	const onSaveGameSeries = async (values: GameSeries) => {
		await apiLibraryGameSeriesSave(values);
		const dataList = (await apiLibraryGameSeriesList()).page.list;
		setSeriesList(dataList);
	};

	const onCategorySearch = (value: string) => {
		setCategorySearch(value);
	};

	const onPlatformSearch = (value: string) => {
		setPlatformSearch(value);
	};

	const onSeriesSearch = (value: string) => {
		setSeriesSearch(value);
	};

	const onCategoryChange = (value: number[]) => {
		setCategorySearch("");
		form.setValue("categoryId", value);
	};

	const onPlatformChange = (value: number[]) => {
		setPlatformSearch("");
		form.setValue("platformId", value);
	};

	const onSeriesChange = (value: number[]) => {
		setSeriesSearch("");
		form.setValue("seriesId", value);
	};

	const onSubmit = async (values: Game) => {
		const { developer, publisher, ...rest } = values;

		const newValues = {
			...rest,
			developerId: developer?.map((item) => item.id).join(","),
			developerName: developer?.map((item) => item.name).join(","),
			publisherId: publisher?.map((item) => item.id).join(","),
			publisherName: publisher?.map((item) => item.name).join(","),
			platformId: rest.platformId?.join(","),
			categoryId: rest.categoryId?.join(","),
			seriesId: rest.seriesId?.join(","),
		} as LibraryGameSaveReq;

		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryGameSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryGameUpdate(newValues);
		} else {
			await apiLibraryGameSave(newValues);
		}

		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	// 关闭弹窗时，清空开发者和开发商字段
	useEffect(() => {
		if (show === false) {
			developerField.remove();
			publisherField.remove();
		}
	}, [show]);

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

							<div className="space-y-2">
								<p>Developer</p>
								{developerField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`developer.${index}.name`}
										rules={{ required: "Developer name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Developer {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Developer" />
														<Button type="button" onClick={() => developerField.remove(index)}>
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
									onClick={() => developerField.append({ id: "-1", name: "" })}
								>
									Add Developer
								</Button>
							</div>

							<div className="space-y-2">
								<p>Publisher</p>
								{publisherField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`publisher.${index}.name`}
										rules={{ required: "Publisher name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Publisher {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Publisher" />
														<Button type="button" onClick={() => publisherField.remove(index)}>
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
									onClick={() => publisherField.append({ id: "-1", name: "" })}
								>
									Add Publisher
								</Button>
							</div>

							<FormField
								control={form.control}
								name="platformId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Platform</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onPlatformSearch }}
												onChange={onPlatformChange}
												placeholder="Select Platform"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{platformSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveGamePlatform({ name: platformSearch })}
															>
																Create <Badge>{platformSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={platformList.map((item) => ({ label: item.name, value: item.id }))}
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
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
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
																onClick={() => onSaveGameCategory({ name: categorySearch })}
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
								name="seriesId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Series</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onSeriesSearch }}
												onChange={onSeriesChange}
												placeholder="Select Series"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{seriesSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveGameSeries({ name: seriesSearch })}
															>
																Create <Badge>{seriesSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={seriesList.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="releaseDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Release Date</FormLabel>
										<FormControl>
											<DatePicker
												{...field}
												value={dayjs(field.value || "2025-06-01")}
												onChange={(_, dateString) => {
													form.setValue("releaseDate", dateString || "");
												}}
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
