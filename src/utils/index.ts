/**
 * 拼接url
 * @param parts url分组
 * @returns 拼接后的url
 * @example
 * urlJoin("/admin/", "/api/", "/user/") => "/admin/api/user/"
 * urlJoin("/admin", "api", "user/") => "/admin/api/user/"
 * urlJoin("/admin/", "", "/user/") => "/admin/user"
 */
export function urlJoin(...parts:string[]) {
  const result = parts
    .map(part => {
      return part.replace(/^\/+|\/+$/g, ""); // 去除前后的/
    })
    .filter(Boolean); // 过滤掉空字符串
  return `/${result.join("/")}`;
}