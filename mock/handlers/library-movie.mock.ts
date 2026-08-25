import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryMovieApi,
	type LibraryMovieCategoryListRes,
	type LibraryMovieCategorySaveReq,
	type LibraryMovieListRes,
	type LibraryMovieSaveReq,
} from "@/api/services/library-movie.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

const store = {
	Moive: "movie-test",
	Category: "category-test",
};
const db = await openDatabase("library-movie-test", store, 1);

const mockLibraryMovieList = http.get(`${apiPrefix}${LibraryMovieApi.MovieList}`, async () => {
	const movies = (await db.getAll(store.Moive)) as LibraryMovieSaveReq[];
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
	await db.add(store.Moive, await request.json());
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
	await db.put(store.Moive, await request.json());
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

const mockLibraryMovieCategoryList = http.get(`${apiPrefix}${LibraryMovieApi.MovieCategoryList}`, async () => {
	const categories = (await db.getAll(store.Category)) as LibraryMovieCategorySaveReq[];
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
		await db.add(store.Category, await request.json());
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
		await db.put(store.Category, await request.json());
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
	mockLibraryMovieCategoryList,
	mockLibraryMovieCategorySave,
	mockLibraryMovieCategoryUpdate,
};
