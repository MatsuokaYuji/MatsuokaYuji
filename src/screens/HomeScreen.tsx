// import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
// lib
import { getShops } from "../lib/firebase";
import { ShopReviewItem } from "../components/ShopReviewItem";
import { Shop } from '../types/shop';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}

export const HomeScreen = ({ navigation }: Props) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  },[]);

  const getFirebaseItems = async() => {
    const shops = await getShops();
    setShops(shops);
    console.log(shops);
    console.log("hoge");
    //テストコード
  //   const db = firebase.firestore();
  //   const shopDocumentReference = db
  // .collection('shops') // ここまででCollcectionReferenceを取得
  // .doc('1');
  // console.log(shopDocumentReference);
  // await shopDocumentReference.update({name: "レストラン品川 2号店"})


  };

  const onPressShop = (shop: Shop) => {
    navigation.navigate("Shop", { shop});
  }
  return (
  <SafeAreaView style={styles.container}><FlatList
    data={shops}
    renderItem={({ item }: {item: Shop}) => <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
