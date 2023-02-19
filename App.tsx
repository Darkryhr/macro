import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View className='flex-1 items-center justify-center bg-gray-100'>
      <Text className='text-8xl'>0</Text>
      <Text className='text-base'>Calories</Text>
      <Pressable
        className='bg-blue-400 p-4 m-4'
        onPress={() => navigation.navigate('Details')}
      >
        <MaterialIcons name='add' size={38} color='#25292e' />
      </Pressable>
      <StatusBar style='auto' />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
