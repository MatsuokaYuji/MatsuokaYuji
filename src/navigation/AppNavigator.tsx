import React,{useContext} from "react";
// navigator
import { NavigationContainer } from '@react-navigation/native';
// // screen
// import {HomeScreen} from "../screens/HomeScreen";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthScreen } from "../screens/AuthScreen";
// contexts
import { UserContext } from "../contexts/userContext";


export const AppNavigator = () => {
  const {user} = useContext(UserContext);

    return (
      <NavigationContainer>
        {!user ? <AuthScreen/> : <MainTabNavigator />}
      </NavigationContainer>
    )
  }