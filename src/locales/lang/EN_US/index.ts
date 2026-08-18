import common from "./common.json?raw";
import sys from "./sys.json?raw";

const en_US = { ...JSON.parse(common.replace(/^\uFEFF/, "")), ...JSON.parse(sys.replace(/^\uFEFF/, "")) };
export default en_US;
