import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@hooks/auth';

import { Order } from '@screens/Order';
import { Home } from '@screens/Home';
import { Products } from '@screens/Products';

import { UserTabRoutes } from './user.tab.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes(){
  const { user } = useAuth();


  return (
    <Navigator screenOptions={{ headerShown: false }}>

      {
        user?.isAdmin ? (
          <Group>
             <Screen name="Home" component={Home} />  
    
             <Screen name="Products" component={Products} />
          </Group>
        ) : (
          <Group>
             <Screen name="UserTabRoutes" component={UserTabRoutes} />  
             <Screen name="order" component={Order} />  
          </Group>
        )

      }

   

    </Navigator>
  );
}