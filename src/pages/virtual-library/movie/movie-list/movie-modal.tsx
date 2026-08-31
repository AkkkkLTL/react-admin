import { DatePicker, Rate, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryMovieCategoryList,
	apiLibraryMovieCategorySave,
	apiLibraryMovieSave,
	apiLibraryMovieUpdate,
	type LibraryMovieSaveReq,
} from "@/api/services/library-movie.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { Movie, MovieCategory } from "../../types";
import { useMovieEnumContext } from "./movie-enum-provider";

export interface MovieModalProps {
	formValue: Movie;
	title: string;
	show: boolean;
	onCancel: () => void;
	onOk: () => void;
}

export function MovieModal({ formValue, title, show, onCancel, onOk }: MovieModalProps) {
	const [categorySearch, setCategorySearch] = useState("");
	const { TYPE_LIST, STATUS, category, language, region, setCategory } = useMovieEnumContext();

	const form = useForm<Movie>({
		defaultValues: formValue,
	});

	const directorField = useFieldArray({
		name: "director",
		control: form.control,
	});

	const editorField = useFieldArray({
		name: "editor",
		control: form.control,
	});

	const actorField = useFieldArray({
		name: "actor",
		control: form.control,
	});

	const onCategorySearch = (value: string) => {
		setCategorySearch(value);
	};

	const onCategorySave = async (value: MovieCategory) => {
		await apiLibraryMovieCategorySave(value);
		const category = (await apiLibraryMovieCategoryList()).page.list || [];
		setCategory(category);
	};

	const onCategoryChange = (value: number[]) => {
		setCategorySearch("");
		form.setValue("categoryId", value);
	};

	const onSubmit = async (values: Movie) => {
		const { director, editor, actor, ...rest } = values;

		const newValues = {
			...rest,
			directorId: director?.map((item) => item.id).join(","),
			directorName: director?.map((item) => item.name).join(","),
			editorId: editor?.map((item) => item.id).join(","),
			editorName: editor?.map((item) => item.name).join(","),
			actorId: actor?.map((item) => item.id).join(","),
			actorName: actor?.map((item) => item.name).join(","),
			categoryId: rest.categoryId?.join(","),
			language: rest.language?.join(","),
			region: rest.region?.join(","),
		} as LibraryMovieSaveReq;

		// 处理空值
		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryMovieSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryMovieUpdate(newValues);
		} else {
			await apiLibraryMovieSave(newValues);
		}

		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	// 关闭弹窗时，清空导演、编辑器和演员字段
	useEffect(() => {
		if (show === false) {
			directorField.remove();
			editorField.remove();
			actorField.remove();
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
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
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
												placeholder="Select Type"
												options={TYPE_LIST}
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
																onClick={() => onCategorySave({ name: categorySearch })}
															>
																Create <Badge>{categorySearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={category.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<p>Director</p>
								{directorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`director.${index}.name`}
										rules={{ required: "Director name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Director {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Director" />
														<Button type="button" onClick={() => directorField.remove(index)}>
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
									onClick={() => directorField.append({ id: "-1", name: "" })}
								>
									Add Director
								</Button>
							</div>

							<div className="space-y-2">
								<p>Editor</p>
								{editorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`editor.${index}.name`}
										rules={{ required: "Editor name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Editor {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Editor" />
														<Button type="button" onClick={() => editorField.remove(index)}>
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
									onClick={() => editorField.append({ id: "-1", name: "" })}
								>
									Add Editor
								</Button>
							</div>

							<div className="space-y-2">
								<p>Actor</p>
								{actorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`actor.${index}.name`}
										rules={{ required: "Actor name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Actor {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Actor" />
														<Button type="button" onClick={() => actorField.remove(index)}>
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
									onClick={() => actorField.append({ id: "-1", name: "" })}
								>
									Add Actor
								</Button>
							</div>

							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
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
												showSearch={{ optionFilterProp: "label" }}
												placeholder="Select Languages"
												options={language.map((item) => ({ label: item.name, value: item.code }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="region"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Region</FormLabel>
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
												showSearch={{ optionFilterProp: "label" }}
												placeholder="Select Regions"
												options={region.map((item) => ({ label: item.name, value: item.code }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="firstBroadcast"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Broadcast Date</FormLabel>
										<FormControl>
											<DatePicker
												{...field}
												value={dayjs(field.value || "2025-06-01")}
												onChange={(_, dateString) => {
													form.setValue("firstBroadcast", dateString || "");
												}}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="season"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Season</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="episodesNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Episodes Number</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="monoDuration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Episode Duration (Minutes)</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="alias"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Alias</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="imdb"
								render={({ field }) => (
									<FormItem>
										<FormLabel>IMDB</FormLabel>
										<FormControl>
											<Input {...field} />
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
												options={STATUS}
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
