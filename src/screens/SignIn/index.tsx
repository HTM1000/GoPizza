import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '@hooks/auth'
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
  const { signIn, isLogging, forggotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn(){
    signIn(email, password);
  }

  function handleForggotPassword(){
    forggotPassword(email);
  }

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
            onChangeText={setEmail}
          />

          <Input 
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForggotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button 
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />

        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}