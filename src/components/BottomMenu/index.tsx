import React from 'react';

import { 
  Container,
  Title,
  Notification,
  Quantity
} from './styles';

interface Props {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({ title, color, notifications }: Props) {
  const noNotifications = notifications === '0';
  
  return (
    <Container>
      <Title color={color}>{ title }</Title>

      {
        notifications && (
          <Notification noNotification={noNotifications}>
            <Quantity noNotification={noNotifications}>{notifications}</Quantity>
          </Notification>
        )
      }
    </Container>
  );
}