import React, { useEffect } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import DogImg from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import './style.css';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import InValidDisplay from './../../components/InvalidCodeReset/index';
import { Spinner } from 'components/Spinner';
import { useTranslation } from 'react-i18next';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const { user, VerifyPasswordResetCode } = UserAuth();
  const [verified, setVerified] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [t] = useTranslation();

  const navigate = useNavigate();
  const query = useQuery();

  const oobCode = query.get('oobCode');
  const onFinish = async () => {
    try {
      await VerifyPasswordResetCode(oobCode);
      setVerified(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    onFinish();
    if (!oobCode) {
      navigate('/');
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section
          style={{
            backgroundImage: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${DogImg})`
          }}
          className="resetpasswordpage"
        >
          <section className="resetpasswordpage-form">
            {verified ? <ResetPasswordForm /> : <InValidDisplay />}
          </section>
        </section>
      )}
    </>
  );
}
