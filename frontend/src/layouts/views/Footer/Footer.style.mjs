import bgImg from 'assets/images/navy-bg.png';
import { styled } from 'styled-components';

export const FooterContainer = styled.footer`
	--footer-columns-row-gap: 1em;
	--footer-columns-col-gap: 1em;
	--footer-padding: 150px 50px;
	color: var(--color-white);
	background-image: url(${bgImg});
	background-repeat: repeat;
	position: relative;
	z-index: 1;
	font-size: 1rem;
`;

export const FooterContent = styled.section`
	margin-inline: 3em;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
	row-gap: var(--footer-columns-row-gap);
	column-gap: var(--footer-columns-col-gap);
	padding: var(--footer-padding);
	position: relative;
`;

export const FooterTitle = styled.h3`
	font-size: 1.5em;
	margin-block: 1em;
	font-weight: 700;
	color: var(--color-white);
	text-transform: capitalize;
`;

export const FooterCopyRight = styled.section`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	position: relative;
	padding: 1.5rem 1rem;
	border-top: 1px solid var(--color-white);

	color: var(--white-300);
	font-size: 0.7rem;
	font-weight: lighter;
	text-transform: uppercase;
`;
