import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './Redux/store';
import { Form, Home } from './screens';
import { RootStackParams } from './types/RootStackParams';

export default function App() {
  const RootStack = createStackNavigator<RootStackParams>();

  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="home" component={Home} />
          <RootStack.Screen name="form" component={Form} />
        </RootStack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
