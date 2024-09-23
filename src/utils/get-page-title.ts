import defaultSetting from "@/settings"

const title = defaultSetting.title || "React Admin Template";

export default function getPageTitle(pageTitle:string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}