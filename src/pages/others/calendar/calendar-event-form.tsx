import { faker } from "@faker-js/faker";
import type { EventInput } from "@fullcalendar/core/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";

export type CalendarEventFormFieldType = Pick<EventInput, "title" | "allDay" | "color"> & {
	id: string;
	description?: string;
	start?: Dayjs;
	end?: Dayjs;
};

const COLORS = ["#00a76f", "#8e33ff", "#00b8d9", "#003768", "#22c55e", "#ffab00", "#ff5630", "#7a0916"];

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	allDay: z.boolean(),
	start: z.date(),
	end: z.date(),
	color: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface CalendarEventFormProps {
	type: "edit" | "add";
	open: boolean;
	onCancel: VoidFunction;
	onEdit: (event: CalendarEventFormFieldType) => void;
	onCreate: (event: CalendarEventFormFieldType) => void;
	onDelete: (id: string) => void;
	initValues: CalendarEventFormFieldType;
}

export default function CalendarEventForm({
	type,
	open,
	onCancel,
	onEdit,
	onCreate,
	onDelete,
	initValues = { id: faker.string.uuid() },
}: CalendarEventFormProps) {
	const title = type === "add" ? "Add Event" : "Edit Event";
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: initValues.title || "",
			description: initValues.description || "",
			allDay: initValues.allDay || false,
			start: initValues.start?.toDate() || new Date(),
			end: initValues.end?.toDate() || new Date(),
			color: initValues.color || COLORS[0],
		},
	});

	useEffect(() => {
		if (open) {
			form.reset({
				title: initValues.title || "",
				description: initValues.description || "",
				allDay: initValues.allDay || false,
				start: initValues.start?.toDate() || new Date(),
				end: initValues.end?.toDate() || new Date(),
				color: initValues.color || COLORS[0],
			});
		}
	}, [open, form, initValues]);

	const handleSubmit = (values: FormValues) => {
		const { id } = initValues;
		const event: CalendarEventFormFieldType = {
			...values,
			id,
			start: dayjs(values.start),
			end: dayjs(values.end),
		};
		if (type === "add") {
			onCreate(event);
		} else {
			onEdit(event);
		}
		onCancel();
	};

	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="allDay"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>All Day</FormLabel>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Start Time</FormLabel>
									<FormControl>
										<Input
											type="datetime-local"
											value={field.value.toISOString().slice(0, 16)}
											onChange={(e) => field.onChange(new Date(e.target.value))}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="end"
							render={({ field }) => (
								<FormItem>
									<FormLabel>End Time</FormLabel>
									<FormControl>
										<Input
											type="datetime-local"
											value={field.value.toISOString().slice(0, 16)}
											onChange={(e) => field.onChange(new Date(e.target.value))}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<FormControl>
										<div className="flex gap-2">
											<Input type="color" {...field} />
											<div className="flex gap-1">
												{COLORS.map((color) => (
													<button
														key={color}
														type="button"
														className="size-6 rounded-full border"
														style={{ backgroundColor: color }}
														onClick={() => field.onChange(color)}
													>
														{color}
													</button>
												))}
											</div>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter>
							{type === "edit" && (
								<Button
									variant={"ghost"}
									size={"icon"}
									type="button"
									onClick={() => {
										onDelete(initValues.id);
										onCancel();
									}}
								>
									<Icon icon="fluent:delete-16-filled" size={20} className="text-error!" />
								</Button>
							)}
							<div className="flex gap-2">
								<Button variant={"ghost"} type="button" onClick={onCancel}>
									Cancel
								</Button>
								<Button type="submit">Save</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
