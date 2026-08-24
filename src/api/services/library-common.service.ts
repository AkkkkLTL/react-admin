import type { CommonLanguage, CommonRegion } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

export type LibraryCommonLanguageSaveReq = CommonLanguage;

export type LibraryCommonRegionSaveReq = CommonRegion;

export type LibraryCommonLanguageListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryCommonLanguageSaveReq[];
	};
};

export type LibraryCommonRegionListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryCommonRegionSaveReq[];
	};
};

export enum LibraryCommonApi {
	LanguageList = "/library/commonlanguage/list",
	LanguageSave = "/library/commonlanguage/save",
	LanguageUpdate = "/library/commonlanguage/update",
	RegionList = "/library/commonregion/list",
	RegionSave = "/library/commonregion/save",
	RegionUpdate = "/library/commonregion/update",
}

const apiLibraryCommonLanguageList = () =>
	apiClient.get<LibraryCommonLanguageListRes>({
		url: LibraryCommonApi.LanguageList,
	});

const apiLibraryCommonLanguageSave = (data: LibraryCommonLanguageSaveReq) =>
	apiClient.post<void>({
		url: LibraryCommonApi.LanguageSave,
		data,
	});

const apiLibraryCommonLanguageUpdate = (data: LibraryCommonLanguageSaveReq) =>
	apiClient.put<void>({
		url: LibraryCommonApi.LanguageUpdate,
		data,
	});

const apiLibraryCommonRegionList = () =>
	apiClient.get<LibraryCommonRegionListRes>({
		url: LibraryCommonApi.RegionList,
	});

const apiLibraryCommonRegionSave = (data: LibraryCommonRegionSaveReq) =>
	apiClient.post<void>({
		url: LibraryCommonApi.RegionSave,
		data,
	});

const apiLibraryCommonRegionUpdate = (data: LibraryCommonRegionSaveReq) =>
	apiClient.put<void>({
		url: LibraryCommonApi.RegionUpdate,
		data,
	});

export {
	apiLibraryCommonLanguageList,
	apiLibraryCommonLanguageSave,
	apiLibraryCommonLanguageUpdate,
	apiLibraryCommonRegionList,
	apiLibraryCommonRegionSave,
	apiLibraryCommonRegionUpdate,
};
