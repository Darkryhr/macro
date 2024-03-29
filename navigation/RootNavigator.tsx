import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';
import NewEntry from '@screens/NewEntry';
import { useUserData } from '@utils/useProvideUser';
import { TabNavigator } from './InitialSetupNavigator';

type RootStackParamList = {
  Home: { calories: number | undefined; calorieLimit: number };
  NewEntry: undefined;
  InitialSetup: undefined;
  Test: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const data = useUserData();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {data.calorieLimit !== 0 ? (
        <>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='NewEntry' component={NewEntry} />
        </>
      ) : (
        // <Stack.Screen name='InitialSetup' component={InitialSetup} />
        <Stack.Screen name='InitialSetup' component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
