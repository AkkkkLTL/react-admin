import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiLibraryMusicAlbumSave, apiLibraryMusicAlbumUpdate } from "@/api/services/library-music.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import type { MusicAlbum } from "../../types";

export interface MusicAlbumModalProps {
	formValue: MusicAlbum;
	title: string;
	show: boolean;
	onCancel: VoidFunction;
	onOk: VoidFunction;
}

export function MusicAlbumModal({ formValue, title, show, onCancel, onOk }: MusicAlbumModalProps) {
	const form = useForm<MusicAlbum>({
		defaultValues: formValue,
	});

	const onSubmit = async (values: MusicAlbum) => {
		for (const [key, value] of Object.entries(values)) {
			if (value === undefined || value === "") {
				delete values[key as keyof MusicAlbum];
			}
		}

		if (values.id) {
			await apiLibraryMusicAlbumUpdate(values);
		} else {
			await apiLibraryMusicAlbumSave(values);
		}
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							rules={{ required: "album name is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Album Name</FormLabel>
									<FormControl>
										<Input {...field} />
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
			</DialogContent>
		</Dialog>
	);
}
