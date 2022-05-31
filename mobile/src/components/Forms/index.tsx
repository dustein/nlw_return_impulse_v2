import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";

import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';


import { styles } from "./styles";
import { theme } from "../../theme";
import { api } from "../../libs/api";
import { feedbackTypes } from '../../utils/feedbackTypes';


interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}


export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [sceenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('')

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

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }
    setIsSendingFeedback(true);

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        sceenshot: sceenshot,
        comment: comment
      })

      onFeedbackSent();
      
    } catch(error) {
      console.log(error);
      setIsSendingFeedback(false)
    }
  }



  const feedbackTypeInfo = feedbackTypes[feedbackType];


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        
        <TouchableOpacity onPress={onFeedbackCanceled}>
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
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreencshotRemove}
          screenshot={sceenshot}         
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>

    </View>
  );
}