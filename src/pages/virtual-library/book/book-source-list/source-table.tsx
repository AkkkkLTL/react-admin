import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import type { BookSource } from "../../types";

export interface SourceTableProps {
	loading: boolean;
	dataSource: BookSource[];
	operations?: {
		onEdit: (formValue: BookSource) => void;
		onDelete?: VoidFunction;
	};
}

export function SourceTable({ loading, dataSource, operations }: SourceTableProps) {
	return (
		<div className="w-full border-t max-h-140 overflow-y-scroll">
			<Table>
				<TableHeader className="sticky top-0">
					<TableRow className="bg-muted hover:bg-muted ">
						<TableHead className="px-0 pl-4 pr-2">来源名称</TableHead>
						<TableHead>获取方式</TableHead>
						<TableHead>备注</TableHead>
						<TableHead>关联书籍</TableHead>
						<TableHead>更新时间</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading && dataSource.length === 0 && (
						<TableRow>
							<TableCell colSpan={6}>
								<Empty>
									<EmptyHeader>
										<EmptyMedia variant={"icon"}>
											<Icon icon="material-symbols:folder-code-outline-rounded" />
										</EmptyMedia>
										<EmptyTitle>暂无来源</EmptyTitle>
										<EmptyDescription>请先添加来源</EmptyDescription>
									</EmptyHeader>
									<EmptyContent className="flex-row justify-center gap-2">
										<Button>新增来源</Button>
									</EmptyContent>
								</Empty>
							</TableCell>
						</TableRow>
					)}
					{!loading &&
						dataSource.length > 0 &&
						dataSource.map((source) => (
							<TableRow key={source.id}>
								<TableCell className="px-0 pl-4 pr-2">{source.name}</TableCell>
								<TableCell>
									<Badge variant="info">借阅（占位）</Badge>
								</TableCell>
								<TableCell>—</TableCell>
								<TableCell className="text-gray-500">{`${source.relationCount} 本` || "—"}</TableCell>
								<TableCell>{source.updateTime?.slice(0, 10) || "—"}</TableCell>
								<TableCell>
									<Button
										variant="default"
										className="shadow-none bg-transparent hover:bg-transparent text-primary"
										onClick={() => operations?.onEdit(source)}
									>
										编辑
									</Button>
									<Button
										disabled={source.relationCount !== undefined && source.relationCount > 0}
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
