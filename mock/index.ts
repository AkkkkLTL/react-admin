import { setupWorker } from "msw/browser";
import { mockTokenExpired } from "./handlers/demo";
import * as sysLoginMock from "./handlers/sys-login.mock";
import * as sysMenuMock from "./handlers/sys-menu.mock";
import * as sysUserMock from "./handlers/sys-user.mock";

const handlers = [
	mockTokenExpired,
	...Object.values(sysLoginMock),
	...Object.values(sysUserMock),
	...Object.values(sysMenuMock),
];
export const worker = setupWorker(...handlers);
