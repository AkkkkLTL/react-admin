import { setupWorker } from "msw/browser";
import { signIn, userList } from "./handlers/user";
import { menuList } from "./handlers/menu";
import { mockTokenExpired } from "./handlers/demo";

const handlers = [signIn, userList, menuList, mockTokenExpired];
export const worker = setupWorker(...handlers);