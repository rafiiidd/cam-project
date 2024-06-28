import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './component/HomeScreen';
import KameraDetail from './component/KameraDetail';
import ProfileScreen from './component/ProfileScreen';
import LoginScreen from './component/LoginScreen';
import CartScreen from './component/CartScreen';
import ProductList from './component/ProductList';
import { CartProvider } from './component/CartContext';
import axios from 'axios';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Keranjang" component={CartScreen} />
    <Drawer.Screen name="LogOut" component={LoginScreen} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Kamera Detail" component={KameraDetail} options={{ headerShown: true }} />
          <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
