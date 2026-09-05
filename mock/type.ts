export const apiPrefix = "/api";

export enum TOKEN {
	DEMO = "demo-token",
	LIBRARY = "library-token",
	MALL = "mall-token",
}
export const ACCESS_TOKEN: Record<string, string> = {
	demo: TOKEN.DEMO,
	library: TOKEN.LIBRARY,
	mall: TOKEN.MALL,
};
