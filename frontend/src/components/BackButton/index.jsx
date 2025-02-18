import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function BackButton() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();

  return (
    <Button
      type="text"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
      style={{ color: '#F76A1A', paddingLeft: 0, marginBlock: 10 }}
    >
      ${t('back')}
    </Button>
  );
}
