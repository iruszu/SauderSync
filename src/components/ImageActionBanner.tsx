import { Card, Overlay, Text } from '@mantine/core';
import classes from './ImageActionBanner.module.css';
import { useLocation } from 'react-router-dom';

export function ImageActionBanner() {
    const location = useLocation();
  const displayName = location.state?.displayName || 'Guest';
  return (
    <Card radius="xl" className={classes.card} style={{ width: '95%', margin: '0 auto' }}>
      <Overlay className={classes.overlay} opacity={0.4} zIndex={0} />

      <div className={classes.content}>
        <Text className={classes.title} c="white" fw={600} size="30px">
          Welcome back, {displayName}!
        </Text>
      </div>
    </Card>
  );
}

export default ImageActionBanner;
