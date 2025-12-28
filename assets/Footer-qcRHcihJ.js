import{s as t,t as f,j as e,r as E,N as j}from"./index-JgEZXFFe.js";import{m as x}from"./proxy-B8NW4Oew.js";import"./NavBar-DyiOIyIz.js";import{u}from"./useTranslation-DRTFNy5h.js";const m=t.span`
	font-size: 1em;
	text-decoration: none;
	font-weight: 700;
	&:hover {
		color: var(--primary-600);
	}

	${i=>i.$main==!0&&f`
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		`}
`,k=t(x.a)`
	position: relative;
	display: inline-block;
	overflow: hidden;
	font-weight: 700;
	white-space: nowrap;
	text-transform: uppercase;
	max-width: fit-content;
`,c=t(x.span)`
	display: inline-block;
`,d=.2,p=.025,h=({children:i,href:o,target:s,animation:g=!0})=>g?e.jsxs(k,{initial:"initial",whileHover:"hovered",href:o,target:s,children:[i.split("").map((r,n)=>e.jsx(c,{variants:{initial:{y:0},hovered:{y:"-105%"}},transition:{duration:d,ease:"easeInOut",delay:p*n},children:r},n)),e.jsx(m,{$main:!0,children:i.split("").map((r,n)=>e.jsx(c,{variants:{initial:{y:"100%"},hovered:{y:0}},transition:{duration:d,ease:"easeInOut",delay:p*n},children:r},n))})]}):e.jsx(m,{href:o,children:i}),l={workingTime:{schedule:[{day:"Mon",time:"9:00 AM – 5:00 PM"},{day:"Tue",time:"9:00 AM – 6:00 PM"},{day:"Thu",time:"9:00 AM – 4:00 PM"},{day:"Fri",time:"9:00 AM – 5:00 PM"},{day:"Sat",time:"9:00 AM – 3:00 PM"}]},email:{address:"servicepet88@gmail.com"}},A="data:image/png;base64,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",v=t.footer`
	--footer-columns-row-gap: 1em;
	--footer-columns-col-gap: 1em;
	--footer-padding: 80px 50px;

	position: sticky;
	bottom: 10px;
	left: 0;
	height: max-content;
	width: 98%;
	padding: 2em;
	color: var(--white-300);
	background-image: url(${A});
	background-repeat: repeat;

	font-size: 1.5rem;
	margin: 2em auto;
	border-radius: 15px;

	@media (max-width: 768px) {
	--footer-padding: 40px 20px;
		display: block;
		position: relative;

		width: 100%;
		height: fit-content;

		margin-block: 0.5em 0;
		bottom: unset;
		border-radius: 0px;
	}
`;t.section`
	padding: var(--footer-padding);
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1em;
	position: relative;
`;const M=t.section`
	padding: var(--footer-padding);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
	row-gap: var(--footer-columns-row-gap);
	column-gap: var(--footer-columns-col-gap);
	position: relative;
`,a=t.h3`
	font-size: 1.5em;
	margin-block: 1em;
	font-weight: 700;
	color: var(--white-300);
	text-transform: capitalize;
`,y=t.section`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	position: relative;
	margin: 1rem;
	padding-block: 10px;
	border-top: 1px dashed var(--white-300);

	color: var(--white-700);
	font-size: 1rem;
	font-weight: normal;
	text-transform: uppercase;
`,T=t.div`
	display: flex;
	gap: 0.5em;
	justify-content: flex-start;
	align-items: center;
`,I=t.span`
	opacity: 0.6;
  font-size: 1.5em;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--white-300);
`,J=t.span`
	font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding: 2px 4px;
  border-radius: 8px;
  border: solid 1px var(--white-300);
	background-color: rgba(255, 255, 255, 0.1);
`;function R(){const{t:i}=u(j.commonNS);return e.jsxs(v,{children:[e.jsxs(M,{children:[e.jsxs("section",{children:[e.jsx(a,{children:i("working time")}),l.workingTime.schedule.map((o,s)=>e.jsxs(T,{children:[e.jsx(I,{children:o.time}),e.jsx(J,{children:o.day})]},s))]}),e.jsxs("section",{children:[e.jsxs(a,{className:"footer-menu-name",children:[" ",i("email")," "]}),e.jsx("p",{className:"footer-call-to-action-link-wrapper",children:e.jsx(h,{href:`mailto:${l.email.address}?subject=Feedback&body = Message"`,animation:!1,target:"_self",children:l.email.address})}),e.jsx(a,{children:i("calling us")}),e.jsx("p",{children:e.jsx(h,{href:"tel:+0916x4841",target:"_self",animation:!0,children:"(+84) 916x4841"})})]}),e.jsxs("section",{children:[e.jsx(a,{children:i("location")}),e.jsxs("ul",{id:"menu-quick-links",className:"footer-menu-list",children:[e.jsx("li",{className:"menu-item menu-item-type-custom menu-item-object-custom",children:e.jsx("p",{children:i("address@Cong_Hoa")})}),e.jsx("li",{className:"menu-item menu-item-type-custom menu-item-object-custom",children:e.jsx("p",{children:i("address@Truong_Sa")})})]})]})]}),e.jsxs(y,{children:[e.jsxs("p",{children:["©2025. Pet88 | ",i("all rights reserved")]}),e.jsxs("p",{children:[i("made by"),e.jsx("a",{href:"https://www.linkedin.com/in/vu-huu-nghia/",children:" NGHIA "})]})]})]})}const U=E.memo(R);export{U as F};
