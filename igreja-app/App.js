import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import MembrosScreen from './screens/MembrosScreen';
import CadastroScreen from './screens/CadastroScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import EditarMembroScreen from './screens/EditarMembroScreen';
import AniversariantesScreen from './screens/AniversariantesScreen';
import DashboardScreen from './screens/DashboardScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início">
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Membros" component={MembrosScreen} />
        <Stack.Screen name="Cadastrar Membro" component={CadastroScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="Editar Membro" component={EditarMembroScreen} />
        <Stack.Screen name="Aniversariantes" component={AniversariantesScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}