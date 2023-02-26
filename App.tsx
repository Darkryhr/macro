import RootNavigator from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from '@utils/useProvideUser';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'JosefinSans-Light': require('./assets/fonts/JosefinSans-Light.ttf'),
    'JosefinSans-Medium': require('./assets/fonts/JosefinSans-Medium.ttf'),
    'JosefinSans-Bold': require('./assets/fonts/JosefinSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DataProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style='auto' />
        </NavigationContainer>
      </SafeAreaProvider>
    </DataProvider>
  );
}
