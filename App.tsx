// import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { UserContext } from './src/contexts/userContext';
import { User } from './src/types/user';
// import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
// // lib
// import { getShops } from "./src/lib/firebase";
// import { ShopReviewItem } from "./src/components/ShopReviewItem";
// import { Shop } from './types/shop';


export default function App() {
  const [user, setUser] = useState<User>();
  return (
  <UserContext.Provider value={{ user, setUser }}>
    <AppNavigator />
    </UserContext.Provider>
  )
}

