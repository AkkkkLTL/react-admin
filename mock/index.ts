import { setupWorker } from "msw/browser";
import { mockTokenExpired } from "./handlers/demo";
// Library 项目
import * as libraryBookMock from "./handlers/library-book.mock";
import * as libraryEBookMock from "./handlers/library-ebook.mock";
// System 项目
import * as sysLoginMock from "./handlers/sys-login.mock";
import * as sysMenuMock from "./handlers/sys-menu.mock";
import * as sysUserMock from "./handlers/sys-user.mock";

const handlers = [
	mockTokenExpired,
	...Object.values(sysLoginMock),
	...Object.values(sysUserMock),
	...Object.values(sysMenuMock),

	// Library 项目
	...Object.values(libraryBookMock),
	...Object.values(libraryEBookMock),
];
export const worker = setupWorker(...handlers);
