import { Tree } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Permission, Role } from "@/types/entity";
import { BasicStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Textarea } from "@/ui/textarea";
import { flattenTrees } from "@/utils/tree";

export interface RoleModalProps {
	formValue: Role;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}
export function RoleModal({ formValue, title, show, onOk, onCancel }: RoleModalProps) {
	// todo:获取所有权限

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

	/**
	 * 处理权限选择变化
	 * @param checked 选中的权限ID数组
	 */
	const onCheck = (checked: any) => {
		setCheckedKeys(checked);
		// todo:根据选中的权限ID数组，获取对应的权限对象
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

						<FormField
							control={form.control}
							name="remark"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Remark</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						{/* <FormField
							control={form.control}
							name="permissions"
							render={() => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Permissions</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Tree
												checkable
												checkedKeys={checkedKeys}
												treeData={}
												fieldNames={{
													key: "id",
													children: "children",
													title: "name",
												}}
												onCheck={onCheck}
											/>
										</FormControl>
									</div>
								</FormItem>
							)}
						/> */}
					</div>
				</Form>
				<DialogFooter>
					<Button variant={"outline"} onClick={onCancel}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							form.handleSubmit(onOk)();
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
