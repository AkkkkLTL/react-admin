import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryLessonList } from "@/api/services/library-lesson.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Lesson, LessonFilterParams } from "../../types";
import LessonEnumProvider from "./lesson-enum-provider";
import { LessonFilterForm } from "./lesson-filter-form";
import { LessonModal, type LessonModalProps } from "./lesson-modal";

const DEFAULT_LESSON_VALUE: Lesson = {
	id: undefined,
	title: "",
	cover: "",
	url: "",
	teacher: [],
	sourceId: [],
	status: ReadStatus.UNREAD,
	rating: undefined,
	noteBookId: "",
	tagId: "",
};

export default function LessonListPage() {
	const [lessonList, setLessonList] = useState<Lesson[]>([]);
	const [tableParams, setTableParams] = useState<LessonFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [lessonModalProps, setLessonModalProps] = useState<LessonModalProps>({
		formValue: { ...DEFAULT_LESSON_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setLessonModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setLessonModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getLessonList();
	}, [refresh]);

	const getLessonList = async () => {
		const dataList = (await apiLibraryLessonList(toURLSearchParams(tableParams))).page.list || [];
		setLessonList(
			dataList.map((item) => {
				const { teacherId, teacherName } = item;
				const newTeacherId = teacherId?.split(",") || [];
				const newTeacherName = teacherName?.split(",") || [];
				return {
					...item,
					teacher: newTeacherId.map((item, index) => ({
						id: item,
						name: newTeacherName[index],
					})),
					sourceId: item.sourceId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const columns: ColumnsType<Lesson> = [
		{
			title: "No",
			render: (_, record, index) => index + 1,
			width: 50,
		},
		{
			title: "Title",
			dataIndex: "title",
			width: 200,
		},
		{
			title: "URL",
			dataIndex: "url",
			width: 200,
			render: (url: string) =>
				url ? (
					<a href={url} target="_blank" rel="noopener noreferrer">
						{url}
					</a>
				) : (
					"-"
				),
		},
		{
			title: "Teacher",
			dataIndex: "teacher",
			width: 200,
			render: (teacher: Lesson["teacher"]) => teacher?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray">
					<Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];

	const onCreate = () => {
		setLessonModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_LESSON_VALUE,
			},
		}));
	};

	const onEdit = (formValue: Lesson) => {
		setLessonModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<LessonEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>Lesson List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<LessonFilterForm
						formValue={tableParams}
						setTableParams={setTableParams}
						onSearch={() => setRefresh(Date.now())}
					/>
				</CardHeader>
				<CardContent>
					<Table
						loading={loading}
						rowKey={"id"}
						size="small"
						scroll={{ x: "max-content" }}
						pagination={false}
						columns={columns}
						dataSource={lessonList}
					/>
				</CardContent>
				<LessonModal {...lessonModalProps} />
			</LessonEnumProvider>
		</Card>
	);
}
