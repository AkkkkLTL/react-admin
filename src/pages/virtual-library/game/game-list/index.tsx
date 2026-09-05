import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryGameList } from "@/api/services/library-game.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Game, GameFilterParams } from "../../types";
import GameEnumProvider, { useGameEnumContext } from "./game-enum-provider";
import { GameFilterForm } from "./game-filter-form";
import { GameModal, type GameModalProps } from "./game-modal";

const DEFAULT_GAME_VALUE: Game = {
	id: undefined,
	title: "",
	oriTitle: "",
	platformId: [],
	categoryId: [],
	developer: [],
	publisher: [],
	releaseDate: "",
	seriesId: [],
	rating: 0,
	noteBookId: "",
	tagId: "",
};

export default function GameListPage() {
	const [gameList, setGameList] = useState<Game[]>([]);
	const [tableParams, setTableParams] = useState<GameFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [gameModalProps, setGameModalProps] = useState<GameModalProps>({
		formValue: structuredClone(DEFAULT_GAME_VALUE),
		title: "New",
		show: false,
		onOk: () => {
			setGameModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_GAME_VALUE), show: false }));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setGameModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_GAME_VALUE), show: false }));
		},
	});

	useEffect(() => {
		setLoading(true);
		getGameList();
	}, [refresh]);

	const getGameList = async () => {
		const dataList = (await apiLibraryGameList(toURLSearchParams(tableParams))).page.list || [];
		setGameList(
			dataList.map((item) => {
				const { developerId, developerName, publisherId, publisherName } = item;
				const newDeveloperId = developerId?.split(",") || [];
				const newDeveloperName = developerName?.split(",") || [];
				const newPublisherId = publisherId?.split(",") || [];
				const newPublisherName = publisherName?.split(",") || [];
				return {
					...item,
					developer: newDeveloperId.map((id, index) => ({
						id,
						name: newDeveloperName[index],
					})),
					publisher: newPublisherId.map((id, index) => ({
						id,
						name: newPublisherName[index],
					})),
					platformId: item.platformId?.split(",").map(Number) || [],
					categoryId: item.categoryId?.split(",").map(Number) || [],
					seriesId: item.seriesId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const columns: ColumnsType<Game> = [
		{
			title: "No",
			render: (_, _record, index) => index + 1,
			width: 50,
		},
		{
			title: "Title",
			dataIndex: "title",
			width: 200,
		},
		{
			title: "Developer",
			dataIndex: "developer",
			width: 200,
			render: (developer: Game["developer"]) => developer?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Publisher",
			dataIndex: "publisher",
			width: 200,
			render: (publisher: Game["publisher"]) => publisher?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Platform",
			dataIndex: "platformId",
			width: 200,
			render: (platformId: Game["platformId"]) => <PlatformCell platformId={platformId} />,
		},
		{
			title: "Category",
			dataIndex: "categoryId",
			width: 200,
			render: (categoryId: Game["categoryId"]) => <CategoryCell categoryId={categoryId} />,
		},
		{
			title: "Series",
			dataIndex: "seriesId",
			width: 200,
			render: (seriesId: Game["seriesId"]) => <SeriesCell seriesId={seriesId} />,
		},
		{
			title: "Release Date",
			dataIndex: "releaseDate",
			width: 150,
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
		setGameModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: structuredClone(DEFAULT_GAME_VALUE),
		}));
	};

	const onEdit = (formValue: Game) => {
		setGameModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<GameEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>Game List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<GameFilterForm
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
						dataSource={gameList}
					/>
				</CardContent>
				<GameModal {...gameModalProps} />
			</GameEnumProvider>
		</Card>
	);
}

const PlatformCell = ({ platformId }: { platformId: Game["platformId"] }) => {
	const { platform } = useGameEnumContext();
	const platformNames = platformId?.map((id) => platform.find((p) => p.id === Number(id))?.name || "-");
	return (
		<>
			{platformNames?.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: false
				<Badge key={index}>{item}</Badge>
			))}
		</>
	);
};

const CategoryCell = ({ categoryId }: { categoryId: Game["categoryId"] }) => {
	const { category } = useGameEnumContext();
	const categoryNames = categoryId?.map((id) => category.find((c) => c.id === Number(id))?.name || "-");
	return (
		<>
			{categoryNames?.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: false
				<Badge key={index}>{item}</Badge>
			))}
		</>
	);
};

const SeriesCell = ({ seriesId }: { seriesId: Game["seriesId"] }) => {
	const { series } = useGameEnumContext();
	const seriesName = series.find((s) => s.id === Number(seriesId))?.name || "-";
	return seriesName;
};
