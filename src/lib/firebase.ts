import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { StyleSheet, Text, View } from 'react-native';
// types
import { Shop } from '../../types/shop';
import { initialUser, User } from '../types/user';
import Constants from "expo-constants";
import { Review } from '../types/review';

if(!firebase.apps.length) {
// const firebaseConfig = {
//   apiKey: "AIzaSyBa83M7sTt57MRQAB3-lWAR9XEeC8aw67I",
//   authDomain: "shop-review-4da97.firebaseapp.com",
//   projectId: "shop-review-4da97",
//   storageBucket: "shop-review-4da97.appspot.com",
//   messagingSenderId: "65117472560",
//   appId: "1:65117472560:web:7ccdd173de49b49607aaf5",
//   measurementId: "G-F53GZ2RPGY"
// };

firebase.initializeApp(Constants.manifest!.extra!.firebase);
}

export const getShops = async() => {
    const snapshot = await firebase
    .firestore()
    .collection("shops")
    .orderBy("score","desc")
    // .where("place", "==", "品川")
    // .where("score", ">", 3)
    .get();
    const shops = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as unknown as Shop));
    return shops;

  };

  export const signin = async () => {
    const userCredential = await firebase.auth().signInAnonymously();
    const { uid } = userCredential.user;
    console.log(uid);
    const userDoc = await firebase.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists){
      await firebase.firestore().collection("users").doc(uid).set(initialUser);
      return {
        ...initialUser,
        id: uid
      } as User;
    } else {
      return {
        id:uid,
        ...userDoc.data()
      }as User
    }
  };

  export const updateUser = async (userId: string, params: any) => {
    await firebase.firestore().collection("users").doc(userId).update(params)
  }

  export const addReview = async (shopId:string,review: Review) => {
    await firebase.firestore().collection("shops").doc(shopId)
    .collection("reviews").add(review);
  }