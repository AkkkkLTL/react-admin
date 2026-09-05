import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryMusicList } from "@/api/services/library-music.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Music, MusicFilterParams } from "../../types";
import MusicEnumProvider from "./music-enum-provider";
import { MusicFilterForm } from "./music-filter-form";
import { MusicModal, type MusicModalProps } from "./music-modal";

const DEFAULT_MUSIC_VALUE: Music = {
	id: undefined,
	title: "",
	performer: [],
	lyricist: [],
	composer: [],
	arranger: [],
	language: [],
	styleId: [],
	albumId: [],
	releaseDate: "",
	noteBookId: "",
	tagId: "",
};

export default function MusicListPage() {
	const [musicList, setMusicList] = useState<Music[]>([]);
	const [tableParams, setTableParams] = useState<MusicFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [musicModalProps, setMusicModalProps] = useState<MusicModalProps>({
		formValue: structuredClone(DEFAULT_MUSIC_VALUE),
		title: "New",
		show: false,
		onOk: () => {
			setMusicModalProps((prev) => ({
				...prev,
				formValue: structuredClone(DEFAULT_MUSIC_VALUE),
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setMusicModalProps((prev) => ({
				...prev,
				formValue: structuredClone(DEFAULT_MUSIC_VALUE),
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getMusicList();
	}, [refresh]);

	const getMusicList = async () => {
		const dataList = (await apiLibraryMusicList(toURLSearchParams(tableParams))).page.list || [];
		setMusicList(
			dataList.map((item) => {
				const {
					performerId,
					performerName,
					lyricistId,
					lyricistName,
					composerId,
					composerName,
					arrangerId,
					arrangerName,
				} = item;
				const newPerformerId = performerId?.split(",") || [];
				const newPerformerName = performerName?.split(",") || [];
				const newLyricistId = lyricistId?.split(",") || [];
				const newLyricistName = lyricistName?.split(",") || [];
				const newComposerId = composerId?.split(",") || [];
				const newComposerName = composerName?.split(",") || [];
				const newArrangerId = arrangerId?.split(",") || [];
				const newArrangerName = arrangerName?.split(",") || [];
				return {
					...item,
					performer: newPerformerId.map((item, index) => ({
						id: item,
						name: newPerformerName[index],
					})),
					lyricist: newLyricistId.map((item, index) => ({
						id: item,
						name: newLyricistName[index],
					})),
					composer: newComposerId.map((item, index) => ({
						id: item,
						name: newComposerName[index],
					})),
					arranger: newArrangerId.map((item, index) => ({
						id: item,
						name: newArrangerName[index],
					})),
					language: item.language?.split(",") || [],
					styleId: item.styleId?.split(",").map(Number) || [],
					albumId: item.albumId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const onCreate = () => {
		setMusicModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: structuredClone(DEFAULT_MUSIC_VALUE),
		}));
	};

	const onEdit = (formValue: Music) => {
		setMusicModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	const columns: ColumnsType<Music> = [
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
			title: "Performer",
			dataIndex: "performer",
			width: 200,
			render: (performer: Music["performer"]) => performer?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Lyricist",
			dataIndex: "lyricist",
			width: 200,
			render: (lyricist: Music["lyricist"]) => lyricist?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Composer",
			dataIndex: "composer",
			width: 200,
			render: (composer: Music["composer"]) => composer?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Arranger",
			dataIndex: "arranger",
			width: 200,
			render: (arranger: Music["arranger"]) => arranger?.map((item) => item.name).join(", ") || "-",
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

	return (
		<Card>
			<MusicEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>Lesson List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<MusicFilterForm
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
						dataSource={musicList}
					/>
				</CardContent>
				<MusicModal {...musicModalProps} />
			</MusicEnumProvider>
		</Card>
	);
}
