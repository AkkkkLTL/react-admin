import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import type { LibraryCommonLanguageSaveReq, LibraryCommonRegionSaveReq } from "@/api/services/library-common.service";
import {
	LibraryMovieApi,
	type LibraryMovieCategoryListRes,
	type LibraryMovieCategorySaveReq,
	type LibraryMovieEnumInfoRes,
	type LibraryMovieListRes,
	type LibraryMovieSaveReq,
} from "@/api/services/library-movie.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

const mockLibraryMovieList = http.get(`${apiPrefix}${LibraryMovieApi.MovieList}`, async () => {
	const movies = (await libraryDatabase.getAll(libraryStore.Movie)) as LibraryMovieSaveReq[];
	return HttpResponse.json<Result & LibraryMovieListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: movies || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMovieSave = http.post(`${apiPrefix}${LibraryMovieApi.MovieSave}`, async ({ request }) => {
	await libraryDatabase.add(libraryStore.Movie, await request.json());
	return HttpResponse.json<Result>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMovieUpdate = http.put(`${apiPrefix}${LibraryMovieApi.MovieUpdate}`, async ({ request }) => {
	await libraryDatabase.put(libraryStore.Movie, await request.json());
	return HttpResponse.json<Result>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
		},
		{
			status: 200,
		},
	);
});

/** 模拟获取电影枚举信息 */
const mockLibraryMovieEnumInfo = http.get(`${apiPrefix}${LibraryMovieApi.MovieEnumInfo}`, async () => {
	const categories = (await libraryDatabase.getAll(libraryStore.MovieCategory)) as LibraryMovieCategorySaveReq[];
	const languages = (await libraryDatabase.getAll(libraryStore.CommonLanguage)) as LibraryCommonLanguageSaveReq[];
	const regions = (await libraryDatabase.getAll(libraryStore.CommonRegion)) as LibraryCommonRegionSaveReq[];
	return HttpResponse.json<Result & LibraryMovieEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			categoryList: categories || [],
			languageList: languages || [],
			regionList: regions || [],
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMovieCategoryList = http.get(`${apiPrefix}${LibraryMovieApi.MovieCategoryList}`, async () => {
	const categories = (await libraryDatabase.getAll(libraryStore.MovieCategory)) as LibraryMovieCategorySaveReq[];
	return HttpResponse.json<Result & LibraryMovieCategoryListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: categories || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMovieCategorySave = http.post(
	`${apiPrefix}${LibraryMovieApi.MovieCategorySave}`,
	async ({ request }) => {
		await libraryDatabase.add(libraryStore.MovieCategory, await request.json());
		return HttpResponse.json<Result>(
			{
				code: ResultEnum.SUCCESS,
				msg: "success",
			},
			{
				status: 200,
			},
		);
	},
);

const mockLibraryMovieCategoryUpdate = http.put(
	`${apiPrefix}${LibraryMovieApi.MovieCategoryUpdate}`,
	async ({ request }) => {
		await libraryDatabase.put(libraryStore.MovieCategory, await request.json());
		return HttpResponse.json<Result>(
			{
				code: ResultEnum.SUCCESS,
				msg: "success",
			},
			{
				status: 200,
			},
		);
	},
);

export {
	mockLibraryMovieList,
	mockLibraryMovieSave,
	mockLibraryMovieUpdate,
	mockLibraryMovieEnumInfo,
	mockLibraryMovieCategoryList,
	mockLibraryMovieCategorySave,
	mockLibraryMovieCategoryUpdate,
};
