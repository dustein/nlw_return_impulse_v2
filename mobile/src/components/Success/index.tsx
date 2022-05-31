import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import successImg from '../../assets/success.png'
import { Copyright } from "../Copyright";
export function Success() {

  return (
  
  <View style={styles.container}>

    <Image
      source={successImg}
      style={styles.image}
    />

    <Text style={styles.title}>
      Grato!
    </Text>

    <TouchableOpacity style={styles.button}>

      <Text style={styles.buttonTitle}>
        Enviar outro feedback?
      </Text>
      
    </TouchableOpacity>

    <Copyright />

  </View>

  )
}