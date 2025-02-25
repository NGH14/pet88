import { styled } from 'styled-components';


export const TextContainer = styled.section`

  justify-content: center;
	font-family: 'Quicksand', sans-serif;
	color: var(--gray-500);
	position: absolute;
	bottom: 10px;
	right: 10px;
	z-index: 1;

	p {
		font-size: 1em;
		display: inline-block;
		font-weight: 500;
	}
`;

export const RatingSection = styled.section`
  display: inline-flex;
	flex-direction: row;
	align-items: center;
  gap: 0.2em;
  padding-inline: 0.3em;
	color: var(--gold-color);
	font-size: 2em;

	p {
		font-weight: 700;
		font-size: 1em;
	}

  svg:has( > p:is(:hover)) ,svg:hover, svg:target {
    animation: stretch-bounce .5s ease-in-out;
  }

  @-webkit-keyframes stretch-bounce {
  0% {
    -webkit-transform: scale(1);
  }
  25% {
    -webkit-transform: scale(1.5);
  }
  50% {
    -webkit-transform: scale(0.9);
  }
  75% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
`;
