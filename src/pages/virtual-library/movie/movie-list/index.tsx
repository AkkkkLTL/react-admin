import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryMovieList } from "@/api/services/library-movie.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Movie, MovieFilterParams } from "../../types";
import MovieEnumProvider, { useMovieEnumContext } from "./movie-enum-provider";
import { MovieFilterForm } from "./movie-filter-form";
import { MovieModal, type MovieModalProps } from "./movie-modal";

const DEFAULT_MOVIE_VALUE: Movie = {
	id: undefined,
	title: "",
	oriTitle: "",
	cover: "",
	type: 3,
	categoryId: [],
	director: [],
	editor: [],
	actor: [],
	region: [],
	language: [],
	firstBroadcast: "",
	season: undefined,
	episodesNumber: undefined,
	monoDuration: undefined,
	alias: "",
	imdb: "",
	status: ReadStatus.UNREAD,
	rating: undefined,
	noteBookId: "",
	tagId: "",
};

export default function MovieListPage() {
	const [movieList, setMovieList] = useState<Movie[]>([]);
	const [tableParams, setTableParams] = useState<MovieFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [movieModalProps, setMovieModalProps] = useState<MovieModalProps>({
		formValue: structuredClone(DEFAULT_MOVIE_VALUE),
		title: "New",
		show: false,
		onOk: () => {
			setMovieModalProps((prev) => ({
				...prev,
				formValue: structuredClone(DEFAULT_MOVIE_VALUE),
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setMovieModalProps((prev) => ({
				...prev,
				formValue: structuredClone(DEFAULT_MOVIE_VALUE),
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getMovieList();
	}, [refresh]);

	const getMovieList = async () => {
		const dataList = (await apiLibraryMovieList(toURLSearchParams(tableParams))).page.list || [];
		setMovieList(
			dataList.map((item) => {
				const { directorId, directorName, editorId, editorName, actorId, actorName } = item;
				const newDirectorId = directorId?.split(",") || [];
				const newDirectorName = directorName?.split(",") || [];
				const newEditorId = editorId?.split(",") || [];
				const newEditorName = editorName?.split(",") || [];
				const newActorId = actorId?.split(",") || [];
				const newActorName = actorName?.split(",") || [];
				return {
					...item,
					director: newDirectorId.map((item, index) => ({
						id: item,
						name: newDirectorName[index],
					})),
					editor: newEditorId.map((item, index) => ({
						id: item,
						name: newEditorName[index],
					})),
					actor: newActorId.map((item, index) => ({
						id: item,
						name: newActorName[index],
					})),
					categoryId: item.categoryId?.split(",").map(Number) || [],
					region: item.region?.split(",") || [],
					language: item.language?.split(",") || [],
				};
			}),
		);
		setLoading(false);
	};

	const columns: ColumnsType<Movie> = [
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
			title: "Director",
			dataIndex: "director",
			width: 200,
			render: (director: Movie["director"]) => {
				return director?.map((item) => item.name).join(", ");
			},
		},
		{
			title: "Editor",
			dataIndex: "editor",
			width: 200,
			render: (editor: Movie["editor"]) => {
				return editor?.map((item) => item.name).join(", ");
			},
		},
		{
			title: "Actor",
			dataIndex: "actor",
			width: 200,
			render: (actor: Movie["actor"]) => {
				return actor?.map((item) => item.name).join(", ");
			},
		},
		{
			title: "Category",
			dataIndex: "categoryId",
			width: 200,
			render: (categoryId: Movie["categoryId"]) => <CategoryCell categoryId={categoryId} />,
		},
		{
			title: "Region",
			dataIndex: "region",
			width: 200,
			render: (region: Movie["region"]) => {
				return region?.map((item) => item).join(", ");
			},
		},
		{
			title: "Language",
			dataIndex: "language",
			width: 200,
			render: (language: Movie["language"]) => {
				return language?.map((item) => item).join(", ");
			},
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
		setMovieModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: structuredClone(DEFAULT_MOVIE_VALUE),
		}));
	};

	const onEdit = (formValue: Movie) => {
		setMovieModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<MovieEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>EBook List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<MovieFilterForm
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
						dataSource={movieList}
					/>
				</CardContent>
				<MovieModal {...movieModalProps} />
			</MovieEnumProvider>
		</Card>
	);
}

const CategoryCell = ({ categoryId }: { categoryId: Movie["categoryId"] }) => {
	const { category } = useMovieEnumContext();
	const categoryName = categoryId?.map((item) => category.find((cat) => cat.id === Number(item))?.name || "-");
	return (
		<>
			{categoryName?.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: false
				<Badge key={index}>{item}</Badge>
			))}
		</>
	);
};
