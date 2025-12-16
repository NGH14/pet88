import dayjs from 'dayjs';
import { Button } from 'antd';

export const ListWeekJump = ({ weekCount, value, onChange, t }) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08)',
      padding: 8,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
      }}>
        {Array.from({ length: weekCount }, (_, i) => (
          <Button
            key={i}
            block
            size="middle"
            onClick={() => {
              const newValue = dayjs(value).add(i + 1, 'w');
              onChange(newValue);
            }}
          >
            {i + 1} {i === 0 ? t('week') : t('weeks')}
          </Button>
        ))}
      </div>
    </div>
  );
};