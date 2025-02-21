import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import LeftSideLogin from '../../components/LoginLeft';
import RightSideLogin from '../../components/LoginRight';

import logoBlack from '../../assets/images/logo-text.png';
import { UserAuth } from '../../context/AuthContext';
import './style.css';

export default function SignIn() {
  const { user } = UserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {!user && (
        <section className="loginpage-wrapper">
          <LeftSideLogin src={logoBlack} />
          <RightSideLogin />
        </section>
      )}
    </>
  );
}
