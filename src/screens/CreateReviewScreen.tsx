import React, { useEffect, useState,useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image} from "react-native";
import { createReviewRef,uploadImage } from "../lib/firebase";
import { pickImage } from "../lib/image-picker";
import { UserContext } from "../contexts/userContext";
import { getExtension } from "../utils/file";
// components
import { ShopDetail } from "../components/ShopDetail";
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
// types
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";
import { Review } from "../types/review";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
    route: RouteProp<RootStackParamList, "CreateReview">
}

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    const { shop } = route.params;
    const [text,setText] = useState<string>("");
    const [score,setScore] = useState<number>(3);
    const {user} = useContext(UserContext);
    const [imageUri,setImageUri] =useState<string>("");


    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () =>(
                <IconButton name="x" onPress={() => navigation.goBack()}/>
            )
        })
    }, [shop]);

    const onSubmit = async () => {
        // documentのID取得
        console.log("aaa");
        if(shop.id){
            const reviewDocRef = await createReviewRef(shop.id);

        
        // const reviewDocRef = await createReviewRef(shop.id);
        console.log("aaa");
        const ext = getExtension(imageUri);
        const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
        //画像をstorageにアップロード
        const downloadUrl = await uploadImage(imageUri,storagePath);
        // reviewドキュメントを作る
        const review = {
            user: {
                name: user?.name,
                id: user?.id    
            },
            shop: {
                name:shop.name,
                id:shop.id
            },
            text,
            score,
            imageUrl:downloadUrl,
            updatedAt: firebase.firestore.Timestamp.now(),
            createdAt: firebase.firestore.Timestamp.now(),
        } as Review;
        // await addReview(shop.id, review);
        await reviewDocRef.set(review);
    }
    };

    const onPickImage = async () => {
        const uri = await pickImage();
        if (uri){
            setImageUri(uri);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => setScore(value)} />
            <TextArea value={text} onChangeText={(value) =>setText(value)}
             label="レビュー"
             placeholder= "レビューを書いてください"
             />
             <View style = {styles.photoContainer}>
             <IconButton name="camera" onPress={onPickImage} color="#ccc" />
             {!!imageUri && <Image source={{uri: imageUri }}
             style = {styles.image}
             />}
             </View>
             <Button text="レビューを投稿する" onPress={onSubmit}/>
        </SafeAreaView>    
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    photoContainer:{
        margin: 8
    },
    image:{
        width:100,
        height:100,
        margin:8
    }
  });