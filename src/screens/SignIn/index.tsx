import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import BrandImg from '@assets/brand.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { 
  Container, 
  Content, 
  Brand, 
  Title, 
  ForgotPasswordButton, 
  ForgotPasswordLabel 
} from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Brand source={BrandImg} />
          <Title>Login</Title>
          <Input 
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Input 
            placeholder="Senha"
            type="secondary"
            secureTextEntry
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button 
            title="Entrar"
            type="secondary"
          />

        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}