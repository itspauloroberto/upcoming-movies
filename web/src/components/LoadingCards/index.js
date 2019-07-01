import React from 'react';
import { Card, Skeleton } from 'antd';
import './index.css';

const LoadingCard = key => (
  <Card
    key={key}
    className="loading-card"
  >
    <Skeleton loading title paragraph />
    <Skeleton loading active paragraph />
    <Skeleton loading active paragraph />
  </Card>
);

export default LoadingCard;