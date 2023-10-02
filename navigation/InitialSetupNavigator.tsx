import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CaloriesScreen } from '@screens/setup/CalorieTabScreen';
import { DoneScreen } from '@screens/setup/DoneTabScreen';
import { GoalScreen } from '@screens/setup/GoalTabScreen';
import { IFScreen } from '@screens/setup/IFTabScreen';
import { MacrosScreen } from '@screens/setup/MacroTabScreen';
import { WelcomeScreen } from '@screens/setup/WelcomeTabScreen';

const Tab = createNativeStackNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='welcome'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Welcome' component={WelcomeScreen} />
      <Tab.Screen name='Calories' component={CaloriesScreen} />
      <Tab.Screen name='Goal' component={GoalScreen} />
      <Tab.Screen name='Macros' component={MacrosScreen} />
      <Tab.Screen name='IF' component={IFScreen} />
      <Tab.Screen name='Done' component={DoneScreen} />
    </Tab.Navigator>
  );
};
