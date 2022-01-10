import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text} from "react-native";
// components
import { ShopDetail } from "../components/ShopDetail";
// types
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "User">;
    route: RouteProp<RootStackParamList, "User">
}

export const UserScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>user sc</Text>
        </SafeAreaView>    
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
  });