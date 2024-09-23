export function isExternal(path:string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str:string) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}