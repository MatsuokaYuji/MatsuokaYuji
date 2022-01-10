import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
// screens
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
import { Header } from "react-native/Libraries/NewAppScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();


const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "#000",
    }
    }>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export const HomeStackNavigator = () => {
  return (
  <RootStack.Navigator>
    <RootStack.Screen name="Main" 
    component={MainStack}
    options={{headerShown: false}}
    />
    <RootStack.Screen name="CreateReview" component={CreateReviewScreen}/>
  </RootStack.Navigator>
  )
}
