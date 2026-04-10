import { DialogContent } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Permission, Role } from "@/types/entity";
import { BasicStatus } from "@/types/enum";
import { Dialog, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { flattenTrees } from "@/utils/tree";

export interface RoleModalProps {
	formValue: Role;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}
export function RoleModal({ formValue, title, show, onOk, onCancel }: RoleModalProps) {
	const form = useForm<Role>({
		defaultValues: formValue,
	});

	const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

	useEffect(() => {
		if (!formValue.permissions) return;
		// const flattenedPermissions = flattenTrees(formValue.permissions);
		setCheckedKeys(formValue.permissions.map((item) => item.id));
	}, [formValue]);

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onCheck = (checked: any) => {
		setCheckedKeys(checked);
		// form.setValue("permissions", PER);
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Name</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Code</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Status</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<RadioGroup
												onValueChange={(value) => field.onChange(Number(value))}
												defaultValue={String(field.value)}
											>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(BasicStatus.ENABLE)} id="r1" />
													<Label htmlFor="r1">Enable</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(BasicStatus.DISABLE)} id="r2" />
													<Label htmlFor="r2">Disable</Label>
												</div>
											</RadioGroup>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
