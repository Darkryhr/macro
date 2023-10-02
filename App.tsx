import RootNavigator from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MacroProvider } from '@utils/useMacros';
import { TrackingDataProvider } from '@utils/useProvideTracker';
import { DataProvider } from '@utils/useProvideUser';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'JosefinSans-Light': require('./assets/fonts/JosefinSans-Light.ttf'),
    'JosefinSans-Medium': require('./assets/fonts/JosefinSans-Medium.ttf'),
    'JosefinSans-Bold': require('./assets/fonts/JosefinSans-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DataProvider>
      <TrackingDataProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style='auto' />
          </NavigationContainer>
        </SafeAreaProvider>
      </TrackingDataProvider>
    </DataProvider>
  );
}
