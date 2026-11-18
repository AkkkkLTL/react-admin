import defaultCover from "@/assets/images/placeholder-50x75.png";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import type { Book } from "../../types";

export interface BookTableProps {
	loading: boolean;
	dataSource: Book[];
	operations?: {
		onEdit: (formValue: Book) => void;
		onDelete?: VoidFunction;
	};
}

export function BookTable({ loading, dataSource, operations }: BookTableProps) {
	return (
		<div className="w-full border-t h-140 overflow-y-scroll">
			<Table>
				<TableHeader className="sticky top-0">
					<TableRow className="bg-muted hover:bg-muted ">
						<TableHead className="px-0 pl-4 pr-2">序号</TableHead>
						<TableHead>封面</TableHead>
						<TableHead>标题</TableHead>
						<TableHead>ISBN</TableHead>
						<TableHead>作者</TableHead>
						<TableHead>译者</TableHead>
						<TableHead>出版社</TableHead>
						<TableHead>分类</TableHead>
						<TableHead>阅读状态</TableHead>
						<TableHead>评分</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading &&
						dataSource.length > 0 &&
						dataSource.map((book, index) => (
							<TableRow key={book.id}>
								<TableCell className="px-0 pl-4 pr-2 text-gray-500">
									{index < 9 ? `0${index + 1}` : index + 1}
								</TableCell>
								<TableCell>
									<span className="inline-flex items-center justify-center aspect-[2/3]">
										<img src={book.cover || defaultCover} alt={book.cover || "—"} className="rounded-sm" />
									</span>
								</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<p className="text-base font-medium">{book.title}</p>
										<p className="text-xs text-gray-500">{book.publishDate?.substring(0, 7) || "—"} 出版</p>
									</div>
								</TableCell>
								<TableCell className="text-gray-500">{book.isbn}</TableCell>
								<TableCell>{book.authors?.map((item) => item.name).join("、") || "—"}</TableCell>
								<TableCell>{book.translators?.map((item) => item.name).join("、") || "—"}</TableCell>
								<TableCell>{book.publisherName || "—"}</TableCell>
								<TableCell>
									{(book.categoryName && (
										<Badge variant={"info"} className="bg-gray-500/10 text-gray-500 font-normal px-2 py-1">
											{book.categoryName}
										</Badge>
									)) ||
										"—"}
								</TableCell>
								<TableCell>
									{book.readStatus === ReadStatus.WANTTOREAD && <Badge variant="info">想读</Badge>}
									{book.readStatus === ReadStatus.UNREAD && (
										<Badge variant="info" className="bg-gray-500/10 font-normal">
											<div className="flex flex-row gap-1 items-center py-1">
												<div className="rounded-md size-1 bg-gray-500" />
												<span className="text-xs text-gray-500">未读</span>
											</div>
										</Badge>
									)}
									{book.readStatus === ReadStatus.READING && <Badge variant="warning">在读</Badge>}
									{book.readStatus === ReadStatus.STOPREAD && <Badge variant="success">暂停</Badge>}
									{book.readStatus === ReadStatus.READED && <Badge variant="success">已读</Badge>}
									{book.readStatus === ReadStatus.GIVEUPREAD && <Badge variant="error">放弃</Badge>}
								</TableCell>
								<TableCell>
									{(book.rating && (
										<>
											<span className="text-base text-primary font-medium">{(book.rating * 2.0).toFixed(1)}</span>
											<span className="text-xs text-gray-500"> / 10</span>
										</>
									)) ||
										"—"}
								</TableCell>
								<TableCell>
									<Button
										variant="default"
										className="shadow-none bg-transparent hover:bg-transparent text-primary"
										onClick={() => operations?.onEdit(book)}
									>
										编辑
									</Button>
									<Button variant="default" className="shadow-none bg-transparent hover:bg-transparent text-red-500">
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
