import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import type { BookPublisher } from "../../types";

export interface PublisherTableProps {
	loading: boolean;
	dataSource: BookPublisher[];
	operations?: {
		onEdit: (formValue: BookPublisher) => void;
	};
}

export function PublisherTable({ loading, dataSource, operations }: PublisherTableProps) {
	return (
		<div className="w-full border-t max-h-140 overflow-y-scroll">
			<Table>
				<TableHeader className="sticky top-0">
					<TableRow className="bg-muted hover:bg-muted ">
						<TableHead className="px-0 pl-4 pr-2 w-[70%]">出版社名称</TableHead>
						<TableHead>关联书籍</TableHead>
						<TableHead>更新时间</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading && dataSource.length === 0 && (
						<TableRow>
							<TableCell colSpan={4}>
								<Empty>
									<EmptyHeader>
										<EmptyMedia variant={"icon"}>
											<Icon icon="material-symbols:folder-code-outline-rounded" />
										</EmptyMedia>
										<EmptyTitle>暂无出版社</EmptyTitle>
										<EmptyDescription>请先添加出版社</EmptyDescription>
									</EmptyHeader>
									<EmptyContent className="flex-row justify-center gap-2">
										<Button>新增出版社</Button>
									</EmptyContent>
								</Empty>
							</TableCell>
						</TableRow>
					)}
					{!loading &&
						dataSource.length > 0 &&
						dataSource.map((publisher) => (
							<TableRow key={publisher.id}>
								<TableCell className="px-0 pl-4 pr-2">{publisher.name}</TableCell>
								<TableCell className="text-gray-500">{`${publisher.relationCount} 本` || "—"}</TableCell>
								<TableCell>{publisher.updateTime?.slice(0, 10) || "—"}</TableCell>
								<TableCell>
									<Button
										variant="default"
										className="shadow-none bg-transparent hover:bg-transparent text-primary"
										onClick={() => operations?.onEdit(publisher)}
									>
										编辑
									</Button>
									<Button
										disabled={publisher.relationCount !== undefined && publisher.relationCount > 0}
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
