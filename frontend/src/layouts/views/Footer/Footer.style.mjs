import bgImg from 'assets/images/navy-bg.png';
import { motion } from 'motion/react';
import { styled } from 'styled-components';

export const FooterContainer = styled.footer`
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
	background-image: url(${bgImg});
	background-repeat: repeat;

	font-size: 1.5rem;
	margin: 2em auto;
	border-radius: 15px;
`;

export const FooterContentFlexBox = styled.section`
	padding: var(--footer-padding);
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1em;
	position: relative;
`;

export const FooterContentGrid = styled.section`
	padding: var(--footer-padding);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
	row-gap: var(--footer-columns-row-gap);
	column-gap: var(--footer-columns-col-gap);
	position: relative;
`;

export const FooterTitle = styled.h3`
	font-size: 1.5em;
	margin-block: 1em;
	font-weight: 700;
	color: var(--white-300);
	text-transform: capitalize;
`;

export const FooterCopyRight = styled.section`
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
`;
