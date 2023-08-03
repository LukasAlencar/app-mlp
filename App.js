import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Home from './src/pages/Home/Home'; 
import { useCallback, useEffect, useState } from 'react';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const {height} = useWindowDimensions();
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>
      <ScrollView
        contentContainerStyle={styles.container}>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen options={{headerShown: false}} name='Home' component={Home}/>
            <Stack.Screen options={{headerShown: false}} name='Login' component={Login}/>
            <Stack.Screen options={{headerShown: false}} name='Register' component={Register}/>
          </Stack.Navigator>
      </ScrollView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10151f',
  },
  containerPage:{
    flex: 1,
  }
});
