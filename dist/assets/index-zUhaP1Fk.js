import{t as fe,S as V,g as he,c as Z,r as f,C as U,d as K,o as ge,_ as me,L as ve,e as xe,f as ne,h as W,j as m,B as Ee,i as H,b as Ce,k as G,m as re,M as Se,n as be,R as h,p as M,q as se,O as Ne,s as ye}from"./index-ZnqEDNZj.js";import{S as Oe}from"./index-rpfbkYdG.js";function Te(t,n,a){return typeof a=="boolean"?a:t.length?!0:fe(n).some(r=>r.type===V)}const ke=t=>{const{componentCls:n,bodyBg:a,lightSiderBg:e,lightTriggerBg:r,lightTriggerColor:s}=t;return{[`${n}-sider-light`]:{background:e,[`${n}-sider-trigger`]:{color:s,background:r},[`${n}-sider-zero-width-trigger`]:{color:s,background:r,border:`1px solid ${a}`,borderInlineStart:0}}}},$e=t=>{const{antCls:n,componentCls:a,colorText:e,triggerColor:r,footerBg:s,triggerBg:i,headerHeight:o,headerPadding:l,headerColor:c,footerPadding:p,triggerHeight:u,zeroTriggerHeight:d,zeroTriggerWidth:g,motionDurationMid:x,motionDurationSlow:v,fontSize:b,borderRadius:O,bodyBg:D,headerBg:z,siderBg:L}=t;return{[a]:Object.assign(Object.assign({display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:D,"&, *":{boxSizing:"border-box"},[`&${a}-has-sider`]:{flexDirection:"row",[`> ${a}, > ${a}-content`]:{width:0}},[`${a}-header, &${a}-footer`]:{flex:"0 0 auto"},[`${a}-sider`]:{position:"relative",minWidth:0,background:L,transition:`all ${x}, background 0s`,"&-children":{height:"100%",marginTop:-.1,paddingTop:.1,[`${n}-menu${n}-menu-inline-collapsed`]:{width:"auto"}},"&-has-trigger":{paddingBottom:u},"&-right":{order:1},"&-trigger":{position:"fixed",bottom:0,zIndex:1,height:u,color:r,lineHeight:Z(u),textAlign:"center",background:i,cursor:"pointer",transition:`all ${x}`},"&-zero-width":{"> *":{overflow:"hidden"},"&-trigger":{position:"absolute",top:o,insetInlineEnd:t.calc(g).mul(-1).equal(),zIndex:1,width:g,height:d,color:r,fontSize:t.fontSizeXL,display:"flex",alignItems:"center",justifyContent:"center",background:L,borderStartStartRadius:0,borderStartEndRadius:O,borderEndEndRadius:O,borderEndStartRadius:0,cursor:"pointer",transition:`background ${v} ease`,"&::after":{position:"absolute",inset:0,background:"transparent",transition:`all ${v}`,content:'""'},"&:hover::after":{background:"rgba(255, 255, 255, 0.2)"},"&-right":{insetInlineStart:t.calc(g).mul(-1).equal(),borderStartStartRadius:O,borderStartEndRadius:0,borderEndEndRadius:0,borderEndStartRadius:O}}}}},ke(t)),{"&-rtl":{direction:"rtl"}}),[`${a}-header`]:{height:o,padding:l,color:c,lineHeight:Z(o),background:z,[`${n}-menu`]:{lineHeight:"inherit"}},[`${a}-footer`]:{padding:p,color:e,fontSize:b,background:s},[`${a}-content`]:{flex:"auto",color:e,minHeight:0}}},Re=t=>{const{colorBgLayout:n,controlHeight:a,controlHeightLG:e,colorText:r,controlHeightSM:s,marginXXS:i,colorTextLightSolid:o,colorBgContainer:l}=t,c=e*1.25;return{colorBgHeader:"#001529",colorBgBody:n,colorBgTrigger:"#002140",bodyBg:n,headerBg:"#001529",headerHeight:a*2,headerPadding:`0 ${c}px`,headerColor:r,footerPadding:`${s}px ${c}px`,footerBg:n,siderBg:"#001529",triggerHeight:e+i*2,triggerBg:"#002140",triggerColor:o,zeroTriggerWidth:e,zeroTriggerHeight:e,lightSiderBg:l,lightTriggerBg:l,lightTriggerColor:r}},ae=he("Layout",t=>[$e(t)],Re,{deprecatedTokens:[["colorBgBody","bodyBg"],["colorBgHeader","headerBg"],["colorBgTrigger","triggerBg"]]});var oe=function(t,n){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};function P(t){let{suffixCls:n,tagName:a,displayName:e}=t;return r=>f.forwardRef((i,o)=>f.createElement(r,Object.assign({ref:o,suffixCls:n,tagName:a},i)))}const X=f.forwardRef((t,n)=>{const{prefixCls:a,suffixCls:e,className:r,tagName:s}=t,i=oe(t,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:o}=f.useContext(U),l=o("layout",a),[c,p,u]=ae(l),d=e?`${l}-${e}`:l;return c(f.createElement(s,Object.assign({className:K(a||d,r,p,u),ref:n},i)))}),Le=f.forwardRef((t,n)=>{const{direction:a}=f.useContext(U),[e,r]=f.useState([]),{prefixCls:s,className:i,rootClassName:o,children:l,hasSider:c,tagName:p,style:u}=t,d=oe(t,["prefixCls","className","rootClassName","children","hasSider","tagName","style"]),g=ge(d,["suffixCls"]),{getPrefixCls:x,layout:v}=f.useContext(U),b=x("layout",s),O=Te(e,l,c),[D,z,L]=ae(b),ue=K(b,{[`${b}-has-sider`]:O,[`${b}-rtl`]:a==="rtl"},v==null?void 0:v.className,i,o,z,L),de=f.useMemo(()=>({siderHook:{addSider:A=>{r(_=>[].concat(me(_),[A]))},removeSider:A=>{r(_=>_.filter(pe=>pe!==A))}}}),[]);return D(f.createElement(ve.Provider,{value:de},f.createElement(p,Object.assign({ref:n,className:ue,style:Object.assign(Object.assign({},v==null?void 0:v.style),u)},g),l)))}),Me=P({tagName:"div",displayName:"Layout"})(Le),ie=P({suffixCls:"header",tagName:"header",displayName:"Header"})(X),Be=P({suffixCls:"footer",tagName:"footer",displayName:"Footer"})(X),le=P({suffixCls:"content",tagName:"main",displayName:"Content"})(X),y=Me;y.Header=ie;y.Footer=Be;y.Content=le;y.Sider=V;y._InternalSiderContext=xe;var we={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"}}]},name:"menu-fold",theme:"outlined"},He=function(n,a){return f.createElement(ne,W({},n,{ref:a,icon:we}))},je=f.forwardRef(He),Ie={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"}}]},name:"menu-unfold",theme:"outlined"},Pe=function(n,a){return f.createElement(ne,W({},n,{ref:a,icon:Ie}))},De=f.forwardRef(Pe);const ze=t=>{const{collapsed:n,toggleCollapes:a}=t;return m.jsx("div",{className:"navbar",children:m.jsx(Ee,{type:"text",icon:n?m.jsx(De,{}):m.jsx(je,{}),onClick:a,style:{fontSize:"16px",width:64,height:64}})})};function j(t){const n=[];return t.forEach(a=>{if(a.hidden)return;const{path:e,name:r,meta:s}=a;if(r){const i={key:e||"",label:r,icon:(s==null?void 0:s.icon)&&f.createElement(Oe,{iconClass:s.icon})};a.children&&(i.children=j(a.children)),n.push(i)}else a.children&&j(a.children).forEach(o=>n.push(o))}),n}const Ae=t=>{const n={},a=(e,r=1)=>{e.forEach(s=>{if(s.key&&(n[s.key]=r),s.children)return a(s.children,r+1)})};return a(t),n},_e=t=>{const n=j(H),a=Ae(n),e=Ce(),[r,s]=f.useState([""]),[i,o]=f.useState(""),[l,c]=f.useState([""]);return{items:n,defaultSelectedKeys:r,activeKey:i,stateOpenKeys:l,handleMenuOnClick:d=>{s(d.keyPath),c(d.keyPath),o(d.key);let g="";for(let x=d.keyPath.length-1;x>-1;--x)g+=d.keyPath[x]+"/";g.charAt(0)!=="/"&&(g="/"+g),e(g),console.log("handleMenuOnClick",[l])},handleOpenChange:d=>{const g=d.find(x=>l.indexOf(x)===-1);if(g){const x=d.filter(v=>v!==g).findIndex(v=>a[v]===a[g]);c(d.filter((v,b)=>b!==x).filter(v=>a[v]<=a[g]))}else c(d);console.log("handleOpenChange",[l,d])}}},Fe=t=>{const n=G(),a=re(H,n),e=a?a[(a==null?void 0:a.length)-1].route:null;e&&console.log(e);const{items:r,defaultSelectedKeys:s,stateOpenKeys:i,handleMenuOnClick:o,handleOpenChange:l}=_e();return console.log("Open State",i),m.jsx(V,{trigger:null,collapsible:!0,width:210,collapsed:t.collapsed,children:m.jsx(Se,{mode:"inline",defaultSelectedKeys:s,openKeys:i,onOpenChange:l,onClick:o,items:r})})};function q(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,be(t,n)}function Ue(t,n){return t.classList?!!n&&t.classList.contains(n):(" "+(t.className.baseVal||t.className)+" ").indexOf(" "+n+" ")!==-1}function Ve(t,n){t.classList?t.classList.add(n):Ue(t,n)||(typeof t.className=="string"?t.className=t.className+" "+n:t.setAttribute("class",(t.className&&t.className.baseVal||"")+" "+n))}function ee(t,n){return t.replace(new RegExp("(^|\\s)"+n+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function Ke(t,n){t.classList?t.classList.remove(n):typeof t.className=="string"?t.className=ee(t.className,n):t.setAttribute("class",ee(t.className&&t.className.baseVal||"",n))}const te={disabled:!1},J=h.createContext(null);var ce=function(n){return n.scrollTop},$="unmounted",N="exited",E="entering",C="entered",R="exiting",S=function(t){q(n,t);function n(e,r){var s;s=t.call(this,e,r)||this;var i=r,o=i&&!i.isMounting?e.enter:e.appear,l;return s.appearStatus=null,e.in?o?(l=N,s.appearStatus=E):l=C:e.unmountOnExit||e.mountOnEnter?l=$:l=N,s.state={status:l},s.nextCallback=null,s}n.getDerivedStateFromProps=function(r,s){var i=r.in;return i&&s.status===$?{status:N}:null};var a=n.prototype;return a.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},a.componentDidUpdate=function(r){var s=null;if(r!==this.props){var i=this.state.status;this.props.in?i!==E&&i!==C&&(s=E):(i===E||i===C)&&(s=R)}this.updateStatus(!1,s)},a.componentWillUnmount=function(){this.cancelNextCallback()},a.getTimeouts=function(){var r=this.props.timeout,s,i,o;return s=i=o=r,r!=null&&typeof r!="number"&&(s=r.exit,i=r.enter,o=r.appear!==void 0?r.appear:i),{exit:s,enter:i,appear:o}},a.updateStatus=function(r,s){if(r===void 0&&(r=!1),s!==null)if(this.cancelNextCallback(),s===E){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:M.findDOMNode(this);i&&ce(i)}this.performEnter(r)}else this.performExit();else this.props.unmountOnExit&&this.state.status===N&&this.setState({status:$})},a.performEnter=function(r){var s=this,i=this.props.enter,o=this.context?this.context.isMounting:r,l=this.props.nodeRef?[o]:[M.findDOMNode(this),o],c=l[0],p=l[1],u=this.getTimeouts(),d=o?u.appear:u.enter;if(!r&&!i||te.disabled){this.safeSetState({status:C},function(){s.props.onEntered(c)});return}this.props.onEnter(c,p),this.safeSetState({status:E},function(){s.props.onEntering(c,p),s.onTransitionEnd(d,function(){s.safeSetState({status:C},function(){s.props.onEntered(c,p)})})})},a.performExit=function(){var r=this,s=this.props.exit,i=this.getTimeouts(),o=this.props.nodeRef?void 0:M.findDOMNode(this);if(!s||te.disabled){this.safeSetState({status:N},function(){r.props.onExited(o)});return}this.props.onExit(o),this.safeSetState({status:R},function(){r.props.onExiting(o),r.onTransitionEnd(i.exit,function(){r.safeSetState({status:N},function(){r.props.onExited(o)})})})},a.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},a.safeSetState=function(r,s){s=this.setNextCallback(s),this.setState(r,s)},a.setNextCallback=function(r){var s=this,i=!0;return this.nextCallback=function(o){i&&(i=!1,s.nextCallback=null,r(o))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},a.onTransitionEnd=function(r,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:M.findDOMNode(this),o=r==null&&!this.props.addEndListener;if(!i||o){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],c=l[0],p=l[1];this.props.addEndListener(c,p)}r!=null&&setTimeout(this.nextCallback,r)},a.render=function(){var r=this.state.status;if(r===$)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var o=se(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(J.Provider,{value:null},typeof i=="function"?i(r,o):h.cloneElement(h.Children.only(i),o))},n}(h.Component);S.contextType=J;S.propTypes={};function T(){}S.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:T,onEntering:T,onEntered:T,onExit:T,onExiting:T,onExited:T};S.UNMOUNTED=$;S.EXITED=N;S.ENTERING=E;S.ENTERED=C;S.EXITING=R;var We=function(n,a){return n&&a&&a.split(" ").forEach(function(e){return Ve(n,e)})},F=function(n,a){return n&&a&&a.split(" ").forEach(function(e){return Ke(n,e)})},Q=function(t){q(n,t);function n(){for(var e,r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return e=t.call.apply(t,[this].concat(s))||this,e.appliedClasses={appear:{},enter:{},exit:{}},e.onEnter=function(o,l){var c=e.resolveArguments(o,l),p=c[0],u=c[1];e.removeClasses(p,"exit"),e.addClass(p,u?"appear":"enter","base"),e.props.onEnter&&e.props.onEnter(o,l)},e.onEntering=function(o,l){var c=e.resolveArguments(o,l),p=c[0],u=c[1],d=u?"appear":"enter";e.addClass(p,d,"active"),e.props.onEntering&&e.props.onEntering(o,l)},e.onEntered=function(o,l){var c=e.resolveArguments(o,l),p=c[0],u=c[1],d=u?"appear":"enter";e.removeClasses(p,d),e.addClass(p,d,"done"),e.props.onEntered&&e.props.onEntered(o,l)},e.onExit=function(o){var l=e.resolveArguments(o),c=l[0];e.removeClasses(c,"appear"),e.removeClasses(c,"enter"),e.addClass(c,"exit","base"),e.props.onExit&&e.props.onExit(o)},e.onExiting=function(o){var l=e.resolveArguments(o),c=l[0];e.addClass(c,"exit","active"),e.props.onExiting&&e.props.onExiting(o)},e.onExited=function(o){var l=e.resolveArguments(o),c=l[0];e.removeClasses(c,"exit"),e.addClass(c,"exit","done"),e.props.onExited&&e.props.onExited(o)},e.resolveArguments=function(o,l){return e.props.nodeRef?[e.props.nodeRef.current,o]:[o,l]},e.getClassNames=function(o){var l=e.props.classNames,c=typeof l=="string",p=c&&l?l+"-":"",u=c?""+p+o:l[o],d=c?u+"-active":l[o+"Active"],g=c?u+"-done":l[o+"Done"];return{baseClassName:u,activeClassName:d,doneClassName:g}},e}var a=n.prototype;return a.addClass=function(r,s,i){var o=this.getClassNames(s)[i+"ClassName"],l=this.getClassNames("enter"),c=l.doneClassName;s==="appear"&&i==="done"&&c&&(o+=" "+c),i==="active"&&r&&ce(r),o&&(this.appliedClasses[s][i]=o,We(r,o))},a.removeClasses=function(r,s){var i=this.appliedClasses[s],o=i.base,l=i.active,c=i.done;this.appliedClasses[s]={},o&&F(r,o),l&&F(r,l),c&&F(r,c)},a.render=function(){var r=this.props;r.classNames;var s=se(r,["classNames"]);return h.createElement(S,W({},s,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},n}(h.Component);Q.defaultProps={classNames:""};Q.propTypes={};var B,w;function Ge(t,n){return!(t===n||h.isValidElement(t)&&h.isValidElement(n)&&t.key!=null&&t.key===n.key)}var k={out:"out-in",in:"in-out"},I=function(n,a,e){return function(){var r;n.props[a]&&(r=n.props)[a].apply(r,arguments),e()}},Xe=(B={},B[k.out]=function(t){var n=t.current,a=t.changeState;return h.cloneElement(n,{in:!1,onExited:I(n,"onExited",function(){a(E,null)})})},B[k.in]=function(t){var n=t.current,a=t.changeState,e=t.children;return[n,h.cloneElement(e,{in:!0,onEntered:I(e,"onEntered",function(){a(E)})})]},B),qe=(w={},w[k.out]=function(t){var n=t.children,a=t.changeState;return h.cloneElement(n,{in:!0,onEntered:I(n,"onEntered",function(){a(C,h.cloneElement(n,{in:!0}))})})},w[k.in]=function(t){var n=t.current,a=t.children,e=t.changeState;return[h.cloneElement(n,{in:!1,onExited:I(n,"onExited",function(){e(C,h.cloneElement(a,{in:!0}))})}),h.cloneElement(a,{in:!0})]},w),Y=function(t){q(n,t);function n(){for(var e,r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return e=t.call.apply(t,[this].concat(s))||this,e.state={status:C,current:null},e.appeared=!1,e.changeState=function(o,l){l===void 0&&(l=e.state.current),e.setState({status:o,current:l})},e}var a=n.prototype;return a.componentDidMount=function(){this.appeared=!0},n.getDerivedStateFromProps=function(r,s){return r.children==null?{current:null}:s.status===E&&r.mode===k.in?{status:E}:s.current&&Ge(s.current,r.children)?{status:R}:{current:h.cloneElement(r.children,{in:!0})}},a.render=function(){var r=this.props,s=r.children,i=r.mode,o=this.state,l=o.status,c=o.current,p={children:s,current:c,changeState:this.changeState,status:l},u;switch(l){case E:u=qe[i](p);break;case R:u=Xe[i](p);break;case C:u=c}return h.createElement(J.Provider,{value:{isMounting:!this.appeared}},u)},n}(h.Component);Y.propTypes={};Y.defaultProps={mode:k.out};const Je=()=>{const t=G().pathname;return m.jsx("section",{className:"app-main",children:m.jsx(Y,{mode:"out-in",children:m.jsx(Q,{addEndListener:(n,a)=>n.addEventListener("transitionend",a),children:m.jsx(Ne,{})},t)})})},Qe=()=>{const t=j(H),n=G(),a=re(H,n);console.log("router Info",a);const[e,r]=f.useState(!1);return{items:t,collapsed:e,toggleCollapes:()=>{r(!e)}}},Ye=ye(y)`
  height: 100%;
  .ant-layout-header {
    padding: 0;
  }
  .main-container {
    overflow-y: scroll;
    background: #fff;
  }
  .app-container {
    padding: 20px;
  }
  .navbar {
    box-shadow: 0 1px 4px rgba(0,21,41,.08)
  }
`,tt=()=>{const{collapsed:t,toggleCollapes:n}=Qe();return m.jsxs(Ye,{className:K(["h-full","app-wrapper"]),children:[m.jsx(Fe,{collapsed:t}),m.jsxs(y,{className:"main-container",children:[m.jsx(ie,{children:m.jsx(ze,{collapsed:t,toggleCollapes:n})}),m.jsx(le,{children:m.jsx(Je,{})})]})]})};export{tt as default};