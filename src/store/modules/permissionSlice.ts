import { AppRouteObject } from "@/router/types";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { Action, AppThunk, permissionState } from "../types";

const permissionSlice = createSlice({
  name: "permission",
  initialState: <permissionState>{
    routes: [],
    addRoutes: []
  },
  reducers: {
    setRoutes: (state, action:Action<AppRouteObject[]>) => {
      state.addRoutes = action.payload;
    }
  }
})

export const {
  setRoutes
} = permissionSlice.actions;

export default permissionSlice.reducer;

function hasPermission(roles:string[], route:AppRouteObject) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role));
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes:AppRouteObject[], roles:string[]) {
  const res:AppRouteObject[] = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

export const generateRoutes:any = (roles:string[]):AppThunk => async (dispatch:Dispatch) => {
  let accessedRoutes;
  if (roles.includes("admin")) {
    //accessedRoutes = asyncRoutes || [];
  } else {
    //accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
  }
  //dispatch(setRoutes(accessedRoutes));
}