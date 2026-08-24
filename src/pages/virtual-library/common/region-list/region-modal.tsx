import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiLibraryCommonRegionSave, apiLibraryCommonRegionUpdate } from "@/api/services/library-common.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { CommonRegion } from "../../types";

export interface RegionModalProps {
	formValue: CommonRegion;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function RegionModal({ formValue, title, show, onOk, onCancel }: RegionModalProps) {
	const form = useForm<CommonRegion>({
		defaultValues: formValue,
	});

	const onSubmit = async (values: CommonRegion) => {
		if (values.id) {
			await apiLibraryCommonRegionUpdate(values);
		} else {
			await apiLibraryCommonRegionSave(values);
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
							name="code"
							rules={{ required: "region code is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Region Code</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							rules={{ required: "region name is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Region Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
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
