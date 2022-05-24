import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Image, ImageProps, Text } from "react-native";
import { styles } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}
// uso do spread ...rest para nao ter que tipar tudo que o Touchlble tem porque tem muitas outras propriedades
export function Option({ title, image, ...rest }: Props) {
  
  return (
    <TouchableOpacity
    style={styles.container}
    {...rest}
    >
    
    <Image
      source={image}
      style={styles.image}
    />  

    <Text style={styles.title}>
      {title}
    </Text> 

    </TouchableOpacity>
  );
}