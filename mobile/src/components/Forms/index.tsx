import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";

import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';


import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from '../../utils/feedbackTypes';


interface Props {
  feedbackType: FeedbackType;
}


export function Form({feedbackType}: Props) {

  const [sceenshot, setScreenshot] = useState<string | null>(null);

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => {
        console.log(uri)
        setScreenshot(uri)
        })
      .catch(error => console.log(error))
  };

  function handleScreencshotRemove() {
    setScreenshot(null);
  }

  const feedbackTypeInfo = feedbackTypes[feedbackType]; 
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>

      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Oh no! Algo errado, deixe seu feedback para que eu possa corrigir, obrigado"
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreencshotRemove}
          screenshot={sceenshot}         
        />

        <Button
          isLoading={true}
        />
      </View>

    </View>
  );
}