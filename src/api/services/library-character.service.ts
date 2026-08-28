import type { Character } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

//#region 请求类型
export type LibraryCharacterSaveReq = Omit<Character, "isVirtual"> & {
	isVirtual?: number;
};
//#endregion 请求类型

//#region 响应类型
export type LibraryCharacterListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryCharacterSaveReq[];
	};
};
//#endregion 响应类型

export enum LibraryCharacterApi {
	// 获取人物列表
	CharacterList = "/library/character/list",
	// 创建人物信息
	CharacterSave = "/library/character/save",
	// 更新人物信息
	CharacterUpdate = "/library/character/update",
}

const apiLibraryCharacterList = (params: URLSearchParams) =>
	apiClient.get<LibraryCharacterListRes>({
		url: LibraryCharacterApi.CharacterList,
		params,
	});

const apiLibraryCharacterSave = (data: LibraryCharacterSaveReq) =>
	apiClient.post<void>({
		url: LibraryCharacterApi.CharacterSave,
		data,
	});

const apiLibraryCharacterUpdate = (data: LibraryCharacterSaveReq) =>
	apiClient.put<void>({
		url: LibraryCharacterApi.CharacterUpdate,
		data,
	});

export { apiLibraryCharacterList, apiLibraryCharacterSave, apiLibraryCharacterUpdate };
