import * as styled from 'styled-components';

const BaseReset = styled.css`
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	main,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
`;

const HTML5Reset = styled.css`
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	main,
	menu,
	nav,
	section {
		display: block;
	}
	*[hidden] {
		display: none;
	}
`;

const TypographyReset = styled.css`
	body {
		line-height: 1;
	}
	ol,
	ul {
		list-style: none;
	}
	blockquote,
	q {
		quotes: none;
	}
	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: '';
		content: none;
	}
`;

const TableReset = styled.css`
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
`;

const BoxSizingReset = styled.css`
	html {
		box-sizing: border-box;
	}
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}
`;

const AdditionalResets = styled.css`
	a {
		text-decoration: none;
		color: inherit;
	}
	button {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: inherit;
		outline: none;
		line-height: inherit;
		-webkit-appearance: none;
	}
`;

const AccessibilityReset = styled.css`
	*,
	*:before,
	*:after {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		user-select: none;
	}
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	blockquote,
	pre,
	ul,
	ol,
	li,
	table,
	tr,
	th,
	td,
	input,
	textarea {
		user-select: text;
	}
`;

export const reset = styled.css`
	${BaseReset}
	${HTML5Reset}
  ${TypographyReset}
  ${TableReset}
  ${BoxSizingReset}
  ${AdditionalResets}
  ${AccessibilityReset}
`;

export default reset;
