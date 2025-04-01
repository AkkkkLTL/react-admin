import { faker } from "@faker-js/faker";
import { BasicStatus, PermissionType } from "@/utils/setting-enum";

// ------------ User Permission Mock Data ----------------
const DASHBOARD_PERMISSION = {
  id: "4281707933534331",
	parentId: "",
  label: "sys.route.dashboard",
	name: "Dashboard",
	icon: "dashboard",
	type: PermissionType.CATALOGUE,
	route: "dashboard",
	order: 1,
	component: "/Dashboard/index.tsx"
}

export const PERMISSION_LIST = [
	DASHBOARD_PERMISSION
];

// ------------ User Role Mock Data ----------------
const ADMIN_ROLE = {
  id: "4281707933534332",
  name: "Admin",
  label: "admin",
  status: BasicStatus.ENABLE,
  order: 1,
  desc: "Super Admin",
	permissions: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: "4281707933534333",
  name: "Test",
  label: "test",
  status: BasicStatus.ENABLE,
  order: 2,
  desc: "Test User",
	permissions: [DASHBOARD_PERMISSION]
}
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

// ------------ User Mock Data ----------------
export const DEFAULT_USER = {
  id: "b34719e1-ce46-457e-9575-99505ecee828",
	username: "admin",
	password: "demo1234",
	email: faker.internet.email(),
	avatar: faker.image.avatarGitHub(),
	createdAt: faker.date.anytime(),
	updatedAt: faker.date.recent(),
	role: ADMIN_ROLE,
	permissions: ADMIN_ROLE.permissions,
}
export const TEST_USER = {
	id: "efaa20ea-4dc5-47ee-a200-8a899be29494",
	username: "test",
	password: "demo1234",
	email: faker.internet.email(),
	avatar: faker.image.avatarGitHub(),
	createdAt: faker.date.anytime(),
	updatedAt: faker.date.recent(),
	role: TEST_ROLE,
	permissions: TEST_ROLE.permissions,
}
export const USER_LIST = [DEFAULT_USER, TEST_USER];