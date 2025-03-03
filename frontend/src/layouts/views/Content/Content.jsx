import { ContentContainer } from './Content.style.mjs';

import {useEffect} from 'react'

export default function Content({ children }) {

	return <ContentContainer>{children}</ContentContainer>;
}
