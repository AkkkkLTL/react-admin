import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryMusicSave,
	apiLibraryMusicStyleList,
	apiLibraryMusicStyleSave,
	apiLibraryMusicUpdate,
	type LibraryMusicSaveReq,
} from "@/api/services/library-music.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { Music, MusicStyle } from "../../types";
import { useMusicEnumContext } from "./music-enum-provider";

export interface MusicModalProps {
	formValue: Music;
	title: string;
	show: boolean;
	onCancel: VoidFunction;
	onOk: VoidFunction;
}

export function MusicModal({ formValue, title, show, onCancel, onOk }: MusicModalProps) {
	const [styleSearch, setStyleSearch] = useState<string>("");

	const { style, album, language, setStyle } = useMusicEnumContext();

	const form = useForm<Music>({
		defaultValues: formValue,
	});

	const performerField = useFieldArray({
		name: "performer",
		control: form.control,
	});

	const lyricistField = useFieldArray({
		name: "lyricist",
		control: form.control,
	});

	const composerField = useFieldArray({
		name: "composer",
		control: form.control,
	});

	const arrangerField = useFieldArray({
		name: "arranger",
		control: form.control,
	});

	const onStyleSearch = (value: string) => {
		setStyleSearch(value);
	};

	const onStyleChange = (values: number[]) => {
		setStyleSearch("");
		form.setValue("styleId", values);
	};

	const onStyleSave = async (value: MusicStyle) => {
		await apiLibraryMusicStyleSave(value);
		const dataList = (await apiLibraryMusicStyleList()).page.list || [];
		setStyle(dataList);
	};

	const onSubmit = async (value: Music) => {
		const { performer, lyricist, composer, arranger, ...rest } = value;

		const newValues = {
			...rest,
			performerId: performer?.map((item) => item.id).join(","),
			performerName: performer?.map((item) => item.name).join(","),
			lyricistId: lyricist?.map((item) => item.id).join(","),
			lyricistName: lyricist?.map((item) => item.name).join(","),
			composerId: composer?.map((item) => item.id).join(","),
			composerName: composer?.map((item) => item.name).join(","),
			arrangerId: arranger?.map((item) => item.id).join(","),
			arrangerName: arranger?.map((item) => item.name).join(","),
			language: rest.language?.join(","),
			styleId: rest.styleId?.join(","),
			albumId: rest.albumId?.join(","),
		} as LibraryMusicSaveReq;

		// 处理空值
		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryMusicSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryMusicUpdate(newValues);
		} else {
			await apiLibraryMusicSave(newValues);
		}
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	// 关闭弹窗时，清空.performer、lyricist、composer和arranger字段
	useEffect(() => {
		if (show === false) {
			performerField.remove();
			lyricistField.remove();
			composerField.remove();
			arrangerField.remove();
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

							<div className="space-y-2">
								<p>Performer</p>
								{performerField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`performer.${index}.name`}
										rules={{ required: "Performer name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Performer {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Performer" />
														<Button type="button" onClick={() => performerField.remove(index)}>
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
									onClick={() => performerField.append({ id: "-1", name: "" })}
								>
									Add Performer
								</Button>
							</div>

							<div className="space-y-2">
								<p>Lyricist</p>
								{lyricistField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`lyricist.${index}.name`}
										rules={{ required: "Lyricist name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Lyricist {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Lyricist" />
														<Button type="button" onClick={() => lyricistField.remove(index)}>
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
									onClick={() => lyricistField.append({ id: "-1", name: "" })}
								>
									Add Lyricist
								</Button>
							</div>

							<div className="space-y-2">
								<p>Composer</p>
								{composerField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`composer.${index}.name`}
										rules={{ required: "Composer name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Composer {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Composer" />
														<Button type="button" onClick={() => composerField.remove(index)}>
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
									onClick={() => composerField.append({ id: "-1", name: "" })}
								>
									Add Composer
								</Button>
							</div>

							<div className="space-y-2">
								<p>Arranger</p>
								{arrangerField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`arranger.${index}.name`}
										rules={{ required: "Arranger name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Arranger {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Arranger" />
														<Button type="button" onClick={() => arrangerField.remove(index)}>
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
									onClick={() => arrangerField.append({ id: "-1", name: "" })}
								>
									Add Arranger
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
												placeholder="Select Language"
												options={language.map((item) => ({ label: item.name, value: item.code }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="styleId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Style</FormLabel>
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
												showSearch={{ optionFilterProp: "label", onSearch: onStyleSearch }}
												onChange={onStyleChange}
												placeholder="Select Style"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{styleSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onStyleSave({ name: styleSearch })}
															>
																Create <Badge>{styleSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={style.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="albumId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Album</FormLabel>
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
												placeholder="Select Album"
												options={album.map((item) => ({ label: item.name, value: item.id }))}
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
