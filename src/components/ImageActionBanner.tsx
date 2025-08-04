import { Card, Overlay, Text } from '@mantine/core';
import classes from './ImageActionBanner.module.css';

export function ImageActionBanner() {
  return (
    <Card radius="xl" className={classes.card} style={{ width: '95%', margin: '0 auto' }}>
      <Overlay className={classes.overlay} opacity={0.4} zIndex={0} />

      <div className={classes.content}>
        <Text className={classes.title} c="white" fw={600} size="30px">
          Welcome back, Kellie!
        </Text>
      </div>
    </Card>
  );
}

export default ImageActionBanner;
