import type { CommonLanguage, CommonRegion, Movie, MovieCategory } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

export type LibraryMovieSaveReq = Movie & {
	categoryId?: string;
	directorId?: string;
	directorName?: string;
	editorId?: string;
	editorName?: string;
	actorId?: string;
	actorName?: string;
	region?: string;
	language?: string;
};

export type LibraryMovieCategorySaveReq = MovieCategory;

export type LibraryMovieListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryMovieSaveReq[];
	};
};

export interface LibraryMovieEnumInfoRes {
	categoryList: MovieCategory[];
	languageList: CommonLanguage[];
	regionList: CommonRegion[];
}

export type LibraryMovieCategoryListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryMovieCategorySaveReq[];
	};
};

export enum LibraryMovieApi {
	MovieEnumInfo = "/library/movie/enuminfo",
	MovieList = "/library/movie/list",
	MovieSave = "/library/movie/save",
	MovieUpdate = "/library/movie/update",
	MovieCategoryList = "/library/moviecategory/list",
	MovieCategorySave = "/library/moviecategory/save",
	MovieCategoryUpdate = "/library/moviecategory/update",
}

const apiLibraryMovieEnumInfo = () =>
	apiClient.get<LibraryMovieEnumInfoRes>({
		url: LibraryMovieApi.MovieEnumInfo,
	});

const apiLibraryMovieList = (params: URLSearchParams) =>
	apiClient.get<LibraryMovieListRes>({
		url: LibraryMovieApi.MovieList,
		params,
	});

const apiLibraryMovieSave = (data: LibraryMovieSaveReq) =>
	apiClient.post<void>({
		url: LibraryMovieApi.MovieSave,
		data,
	});

const apiLibraryMovieUpdate = (data: LibraryMovieSaveReq) =>
	apiClient.put<void>({
		url: LibraryMovieApi.MovieUpdate,
		data,
	});

const apiLibraryMovieCategoryList = () =>
	apiClient.get<LibraryMovieCategoryListRes>({
		url: LibraryMovieApi.MovieCategoryList,
	});

const apiLibraryMovieCategorySave = (data: LibraryMovieCategorySaveReq) =>
	apiClient.post<void>({
		url: LibraryMovieApi.MovieCategorySave,
		data,
	});

const apiLibraryMovieCategoryUpdate = (data: LibraryMovieCategorySaveReq) =>
	apiClient.put<void>({
		url: LibraryMovieApi.MovieCategoryUpdate,
		data,
	});

export {
	apiLibraryMovieEnumInfo,
	apiLibraryMovieList,
	apiLibraryMovieSave,
	apiLibraryMovieUpdate,
	apiLibraryMovieCategoryList,
	apiLibraryMovieCategorySave,
	apiLibraryMovieCategoryUpdate,
};
