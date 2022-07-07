import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container } from './styles';

export function ButtonBack({...rest}: RectButtonProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}> 
      <MaterialIcons  
        name="chevron-left"
        size={18}
        color={COLORS.TITLE}
      />
    </Container>
  );
}