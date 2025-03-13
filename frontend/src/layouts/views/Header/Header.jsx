import {memo} from 'react'
import { HeaderContainer } from './Header.style.mjs';





function Header({ children }) {
	return <HeaderContainer>{children}</HeaderContainer>;
}

export default memo(Header);