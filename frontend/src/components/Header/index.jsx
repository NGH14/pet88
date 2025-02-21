import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '../Button';
import './header.css';

export const Header = ({ user = 'Nghia', onLogin, onLogout, onCreateAccount }) => (
	<header>
		<section className="header-wrapper">
			<section>
				<h1>Acme</h1>
			</section>
			<section>
				{user ? (
					<>
						<span className="welcome">
							Welcome, <b>{user.name}</b>!
						</span>
						<Button size="small" onClick={onLogout} label="Log out" />
					</>
				) : (
					<>
						<Button size="small" onClick={onLogin} label="Log in" />
						<Button primary size="small" onClick={onCreateAccount} label="Sign up" />
					</>
				)}
			</section>
		</section>
	</header>
);

export default Header;

Header.propTypes = {
	user: PropTypes.shape({}),
	onLogin: PropTypes.func,
	onLogout: PropTypes.func,
	onCreateAccount: PropTypes.func,
};

Header.defaultProps = {
	user: null,
};
