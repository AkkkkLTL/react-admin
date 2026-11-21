import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import type { BookCategory } from "../../types";

export interface CategoryTableProps {
	loading: boolean;
	dataSource: BookCategory[];
	operations?: {
		onEdit: (formValue: BookCategory) => void;
	};
}

export function CategoryTable({ loading, dataSource, operations }: CategoryTableProps) {
	return (
		<div className="w-full border-t max-h-140 overflow-y-scroll">
			<Table>
				<TableHeader className="sticky top-0">
					<TableRow className="bg-muted hover:bg-muted ">
						<TableHead className="px-0 pl-4 pr-2">分类名称</TableHead>
						<TableHead>关联书籍</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading && dataSource.length === 0 && (
						<TableRow>
							<TableCell colSpan={3}>
								<Empty>
									<EmptyHeader>
										<EmptyMedia variant={"icon"}>
											<Icon icon="material-symbols:folder-code-outline-rounded" />
										</EmptyMedia>
										<EmptyTitle>暂无分类</EmptyTitle>
										<EmptyDescription>请先添加分类</EmptyDescription>
									</EmptyHeader>
									<EmptyContent className="flex-row justify-center gap-2">
										<Button>新增分类</Button>
									</EmptyContent>
								</Empty>
							</TableCell>
						</TableRow>
					)}
					{!loading &&
						dataSource.length > 0 &&
						dataSource.map((category) => (
							<TableRow key={category.id}>
								<TableCell className="px-0 pl-4 pr-2">
									<div>
										<p>{category.name}</p>
										<p className="text-xs text-gray-500">备注文字</p>
									</div>
								</TableCell>
								<TableCell className="text-gray-500">{`${category.relationCount} 本` || "—"}</TableCell>
								<TableCell>
									<Button
										variant="default"
										className="shadow-none bg-transparent hover:bg-transparent text-primary"
										onClick={() => operations?.onEdit(category)}
									>
										编辑
									</Button>
									<Button
										disabled={category.relationCount !== undefined && category.relationCount > 0}
										variant="default"
										className="shadow-none bg-transparent hover:bg-transparent text-red-500"
									>
										删除
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}
