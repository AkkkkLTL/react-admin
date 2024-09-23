const req = import.meta.glob("./svg/*.svg", {eager:true});
console.log("svgfiles", req);