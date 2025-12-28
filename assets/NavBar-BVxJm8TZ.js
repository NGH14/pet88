import{r,q as b,s as l,j as t}from"./index-CXsAr4fj.js";import{N as c,u as S,a as L}from"./chunk-WWGJGFF6-BxffTVdU.js";import{u as v}from"./useTranslation-BDbXG7tJ.js";import{e as N,C as z}from"./index-DCH3tqKq.js";import{l as B}from"./icon-logo-primary-wTGcesre.js";import{B as C}from"./focus-CQ_iPNPW.js";import{D as O}from"./SubHeader-CqQXJ90U.js";var T={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};function m(){return m=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},m.apply(this,arguments)}const H=(e,n)=>r.createElement(b,m({},e,{ref:n,icon:T})),E=r.forwardRef(H);var I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"};function h(){return h=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},h.apply(this,arguments)}const R=(e,n)=>r.createElement(b,h({},e,{ref:n,icon:I})),$=r.forwardRef(R),p=l.img.attrs(e=>({src:e.Img||B,alt:"Pet88 Logo"}))`
	${e=>e.maxHeight?`max-height: ${e.maxHeight}`:"max-height: 32px"};
	${e=>e.dark&&"filter: brightness(0%)"};
`,A=l.button`
	border-radius: 30px;
	background-color: var(--primary-600);
	padding: 12px 24px;
	text-align: center;
	color: white;
	text-transform: capitalize;
	cursor: pointer;

	font-weight: 900;
	font-size: 1.2em;
	line-height: 24px;
	letter-spacing: -0.01em;
	border: none;
	margin-bottom: 0;
`;function g({TextColor:e,FullWitdh:n}){const[o,i]=r.useState(!1),[a]=v();return t.jsx("section",{className:"authbutton",children:t.jsx(t.Fragment,{children:t.jsx(c,{to:"/sign-in",children:t.jsxs(A,{children:[a("Sign in"),"  ",t.jsx(E,{})]})})})})}l.nav`
	width: 100%;
	height: 50px;
	display: flex;
	flex-direction: column;
`;const W=l(c)`
	color: #171111;
	font-family: 'Nunito Sans', 'Quicksand', sans-serif;

	font-weight: 900;
	text-decoration: none;
	margin: 10px;
	font-size: 1.5em;
	&:hover,
	&:focus,
	&:active {
		color: var(--primary-600) !important;
	}
`,D=l.section`
	width: fit-content;
	background-color: var(--white-700);
	padding: 1em 2em;
	border-radius: 25px;
	position: relative;
`,_=l.nav`
	width: 100%;
	margin: auto;
	padding: 1em 2em;
	font-size: 1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
	z-index: 10;
	color: var(--black-700);
	text-transform: capitalize;
	position: fixed;
`,F=(e=0)=>{const n=r.useCallback(o=>{const i=document.getElementById(o);i&&i.scrollIntoView({behavior:"smooth",block:"start"})},[e]);return r.useEffect(()=>{const o=()=>{const i=window.location.hash.slice(1);i&&setTimeout(()=>n(i),100)};return o(),window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[n]),n},x=[{title:"About",id:"about",url:"/#about"},{title:"Service",id:"service_section",url:"/#service_section"}];function M(){const e=S(),n=L(),[o,i]=r.useState(!1),{t:a,i18n:P}=v(),j=F(),u=(s,d)=>{s.preventDefault(),e.pathname!=="/"?n(d.url):j(d.id),f()},w=s=>{e.pathname==="/"&&(s.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}))},y=()=>{document.body.style.overflow="hidden",i(!0)},f=()=>{document.body.style.overflow="unset",i(!1)};return t.jsx(t.Fragment,{children:t.jsxs(_,{children:[t.jsxs("section",{className:"mobileVisible",children:[t.jsx(C,{onClick:y,type:"text",icon:t.jsx($,{})}),t.jsxs(O,{footer:t.jsx(z,{}),placement:"top",width:300,className:"pet88-menu",onClose:f,closeIcon:t.jsx(N,{}),open:o,bodyStyle:{padding:"0",background:"transparent"},headerStyle:{border:"none",paddingLeft:10},children:[t.jsx("p",{style:{transition:"color 0.3s ease-in-out",textTransform:"uppercase",fontWeight:700,fontSize:16,borderTop:"1px solid black",margin:0},children:" "}),x.map((s,d)=>t.jsx(c,{to:s.url,onClick:k=>u(k,s),style:{transition:"color 0.3s ease-in-out",textTransform:"uppercase",fontWeight:700,fontSize:16,padding:15,borderBottom:"1px solid black"},children:a(s.title)},s.title)),t.jsx(c,{to:"./account",style:{transition:"color 0.3s ease-in-out",fontWeight:700,fontSize:16,padding:15,borderBottom:"1px solid black"},children:a("account")}),t.jsx(c,{to:"/admin",style:{transition:"color 0.3s ease-in-out",fontWeight:700,fontSize:16,padding:15,borderBottom:"1px solid black"},children:a("Admin Centre")}),t.jsx("section",{className:"drawer-auth",children:t.jsx(g,{TextColor:o?"black":"white",FullWitdh:!!o})})]})]}),t.jsx("section",{children:t.jsx("section",{children:t.jsx(c,{to:"/",onClick:w,children:t.jsx(p,{src:p})})})}),t.jsx(D,{className:"mobileHidden",children:x.map(s=>t.jsx(W,{to:s.url,onClick:d=>u(d,s),children:a(s.title)},s.title))}),t.jsx("section",{className:"mobileHidden",children:t.jsx(g,{})})]})})}const X=r.memo(M);export{X as A};
