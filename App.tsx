import RootNavigator from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from '@utils/useProvideUser';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Teko-Bold': require('./assets/fonts/Teko-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DataProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </DataProvider>
  );
}
