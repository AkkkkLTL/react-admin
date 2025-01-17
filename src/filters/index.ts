export function pluralize(time:number, label:string) {
  if (time === 1) return label;
  return label + 's';
}

export function capitalize(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}