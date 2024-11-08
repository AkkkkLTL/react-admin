export function doDynamicImport() {
  let modules = import.meta.glob("~/mock/*.ts", {eager: true});

  let url = modules[`/mock/index.ts`];
  return url;
}