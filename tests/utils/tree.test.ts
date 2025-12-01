import { Permission } from "@/types/entity";
import { PermissionType } from "@/types/enum";
import { flattenTrees } from "@/utils/tree";
import { expect, test } from "vitest";
import { PERMISSION_LIST } from "~/mock/assets";

test("permission flattenTrees", () => {

  expect(flattenTrees<Permission>(PERMISSION_LIST)).toEqual([
    {
      id: "4281707933534331",
      parentId: "",
      label: "sys.menu.dashboard",
      name: "Dashboard",
      icon: "local:ic-dashboard",
      type: PermissionType.CATALOGUE,
      route: "dashboard",
      order: 1,
    },
    {
      id: "4281707933534332",
      parentId: "4281707933534331",
      label: "sys.menu.workbench",
      name: "Workbench",
      type: PermissionType.MENU,
      route: "workbench",
      component: "/dashboard/workbench/index.tsx",
    },
    {
      id: "4281707933534333",
      parentId: "4281707933534331",
      label: "sys.menu.analysis",
      name: "Analysis",
      type: PermissionType.MENU,
      route: "analysis",
      component: "/dashboard/analysis/index.tsx",
    }
  ]);
})