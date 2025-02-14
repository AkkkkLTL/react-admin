const req = import.meta.glob("./svg/*.svg", {eager:true});
const re = /\.\/svg\/(.*)\.svg/;
const requireAll = (requireContext:any) => Object.keys(requireContext);

const svgIcons = requireAll(req).map((item:string) => {
  const match = item.match(re);
  return match ? match[1] : null;
})
console.log("svgfiles", svgIcons);
export default svgIcons;