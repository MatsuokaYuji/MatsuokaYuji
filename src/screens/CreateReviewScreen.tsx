import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text} from "react-native";
// components
import { ShopDetail } from "../components/ShopDetail";
import { IconButton } from "../components/IconButton";
// types
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
    route: RouteProp<RootStackParamList, "CreateReview">
}

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    const { shop } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () =>(
                <IconButton name="x" onPress={() => navigation.goBack()}/>
            )
        })
    }, [shop]);
    return (
        <SafeAreaView style={styles.container}>
            <Text>Reviewを書いてください</Text>
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