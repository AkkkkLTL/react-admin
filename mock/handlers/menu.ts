import { MenuApi } from "@/api/services/menuService";
import { converFlatToTree } from "@/utils/tree";
import { http, HttpResponse } from "msw";
import { DB_SYS_MENUS } from "../assets";
import { ResultEnum } from "#/enum";

const menuList = http.get(`/api${MenuApi.Menu}`, async () => {
    const menuTree = converFlatToTree(DB_SYS_MENUS);

    return HttpResponse.json(
        {
            code: ResultEnum.SUCCESS,
            message: '获取菜单列表成功',
            data: menuTree,
        },
        {
            status: 200,
        }
    );
});

export {
    menuList,
};