import { Menu } from "@/types/entity";
import apiClient from "../apiClient";

/**
 * * @description 菜单服务
 */
export enum MenuApi {
    Menu = "/menu",
}

const getMenuList = () => apiClient.get<Menu[]>({url: MenuApi.Menu});

export default {
    getMenuList,
}