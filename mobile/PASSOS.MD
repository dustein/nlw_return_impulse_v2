
expo install expo-font @expo-google-fonts/inter
instalou phosphor
instalou react-native-svg

para posicao no iphone explicacao no styles button bottom:
npm install react-native-iphone-x-helper (posicao)
para gestos vamos utilizar react-native-bottom-sheet. como dependencias tem que instalar o expo install react-native-reanimated (vide documentacao do mesmo, tem que adicionar no nosso arquivo babel.config a linha plugins: ['react-native-reanimated/plugin'],). E tambem precisa expo install react-native-gesture-handler. Na pagina documentacao, vide API, tem que fazer o import no App.tsx (atencao, na primeira linha).
Como essas bibliotecas mexem com codigo nativo, dar um reestart no expo "expo start --clear" para limpar o cache, depois pode iniciar novamente sem o clear.



