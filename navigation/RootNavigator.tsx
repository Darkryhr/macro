import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';
import NewEntry from '@screens/NewEntry';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='NewEntry' component={NewEntry} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
