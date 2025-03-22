import { BasicStatus } from "@/settings";
import { faker } from "@faker-js/faker";

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: "4281707933534332",
  name: "Admin",
  label: "admin",
  status: BasicStatus.ENABLE,
  order: 1,
  desc: "Super Admin",
};
const TEST_ROLE = {
  id: "4281707933534333",
  name: "Test",
  label: "test",
  status: BasicStatus.ENABLE,
  order: 2,
  desc: "Test User",
}
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: "b34719e1-ce46-457e-9575-99505ecee828",
	username: "admin",
	password: "demo1234",
	email: faker.internet.email(),
	avatar: faker.image.avatarGitHub(),
	createdAt: faker.date.anytime(),
	updatedAt: faker.date.recent(),
	role: ADMIN_ROLE,
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
}
export const USER_LIST = [DEFAULT_USER, TEST_USER];