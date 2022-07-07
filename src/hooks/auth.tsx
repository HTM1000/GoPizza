import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forggotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const USER_COLLECTION = '@gopizza:user';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null)

  async function signIn(email: string, password: string){
    if(!email || !password){
      return Alert.alert('Login', 'Informe o e-mail e senha')
    }

    setIsLogging(true);

   auth()
    .signInWithEmailAndPassword(email, password)
    .then(account => {
      firestore()
      .collection('users')
      .doc(account.user.uid)
      .get()
      .then(async (profile) => {
        const { name, isAdmin } = profile.data() as User;

        if(profile.exists){
          const userData = {
            id: account.user.uid,
            name,
            isAdmin
          };

          await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
          setUser(userData);
        }
      })
      .catch(() => Alert.alert('Nao foi possivel buscar os dados de perfil do usuario'))
    })
    .catch(error => {
      const { code } = error;
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        Alert.alert('Login', 'E-mail e/ou senha inválida.')
      } else {
        return Alert.alert('Nao foi possivel realizar o login');
      }
    })
    .finally(() => setIsLogging(false));
  }

  async function loadUserStorageData(){
    setIsLogging(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if(storedUser){
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOut(){
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forggotPassword(email: string){
    if(!email){
      return Alert.alert('Redefinir senha', 'Informe o e-mail, no campo e-mail')
    } 

    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Redefinir senha', 'Enviamos um link em seu e-mail para redifinir sua senha'))
    .catch(() => Alert.alert('Redefinir senha', 'Nao foi possivel enviar o e-mail para redifinir sua senha'))
  }

  useEffect(() => {
    loadUserStorageData();
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      forggotPassword,
      isLogging,
      user
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context
}

export { AuthProvider, useAuth }