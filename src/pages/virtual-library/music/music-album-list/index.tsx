import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryMusicAlbumList } from "@/api/services/library-music.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import type { MusicAlbum } from "../../types";
import { MusicAlbumModal, type MusicAlbumModalProps } from "./music-album-modal";

const DEFAULT_ALBUM_VALUE: MusicAlbum = {
	id: undefined,
	name: "",
	content: "",
};

export default function MusicAlbumListPage() {
	const [musicAlbumList, setMusicAlbumList] = useState<MusicAlbum[]>([]);
	const [refresh, setRefresh] = useState(0);
	const [musicAlbumModalProps, setMusicAlbumModalProps] = useState<MusicAlbumModalProps>({
		formValue: { ...DEFAULT_ALBUM_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setMusicAlbumModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setMusicAlbumModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		getMusicAlbumList();
	}, [refresh]);

	const getMusicAlbumList = async () => {
		const dataList = (await apiLibraryMusicAlbumList()).page.list || [];
		setMusicAlbumList(dataList);
	};

	const columns: ColumnsType<MusicAlbum> = [
		{
			title: "No",
			render: (_, record, index) => index + 1,
			width: 50,
		},
		{
			title: "Album Name",
			dataIndex: "name",
			width: 200,
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
		setMusicAlbumModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_ALBUM_VALUE,
			},
		}));
	};

	const onEdit = (formValue: MusicAlbum) => {
		setMusicAlbumModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Music Album List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey={"id"}
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={musicAlbumList}
				/>
			</CardContent>
			<MusicAlbumModal {...musicAlbumModalProps} />
		</Card>
	);
}
