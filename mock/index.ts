import { setupWorker } from "msw/browser";
import { mockTokenExpired } from "./handlers/demo";
import * as libraryBookMock from "./handlers/library-book.mock";
import * as libraryCharacterMock from "./handlers/library-character.mock";
import * as libraryCommonMock from "./handlers/library-common.mock";
import * as libraryEBookMock from "./handlers/library-ebook.mock";
import * as libraryGameMock from "./handlers/library-game.mock";
import * as libraryLessonMock from "./handlers/library-lesson.mock";
import * as libraryMovieMock from "./handlers/library-movie.mock";
import * as libraryMusicMock from "./handlers/library-music.mock";
import * as libraryNoteMock from "./handlers/library-note.mock";
// System 项目
import * as sysLoginMock from "./handlers/sys-login.mock";
import * as sysMenuMock from "./handlers/sys-menu.mock";
import * as sysUserMock from "./handlers/sys-user.mock";
// Library 项目
import * as libraryDashboardMock from "./handlers/virtual-library/dashboard.mock";

const handlers = [
	mockTokenExpired,
	...Object.values(sysLoginMock),
	...Object.values(sysUserMock),
	...Object.values(sysMenuMock),

	// Library 项目
	...Object.values(libraryDashboardMock),
	...Object.values(libraryBookMock),
	...Object.values(libraryEBookMock),
	...Object.values(libraryMovieMock),
	...Object.values(libraryCommonMock),
	...Object.values(libraryLessonMock),
	...Object.values(libraryMusicMock),
	...Object.values(libraryNoteMock),
	...Object.values(libraryCharacterMock),
	...Object.values(libraryGameMock),
];
export const worker = setupWorker(...handlers);
