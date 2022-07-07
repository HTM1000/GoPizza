import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { 
  Container,
  Content, 
  Image, 
  Details, 
  Name,
  Identification,
  Description,
  Line
} from './styles';

export interface ProductProps {
  id: string;
  photo_url: string;
  name: string;
  description: string;
}

interface Props extends RectButtonProps {
  data: ProductProps;
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>

        <Image source={{uri: data.photo_url}}/>

        <Details>
          <Identification>
            <Name>{ data.name }</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>
        </Details>

        <Description>{ data.description }</Description>
      </Content>

      <Line />
    </Container>
  );
}