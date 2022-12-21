import {
  LivepeerConfig,
  Player,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react-native';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

const theme: ThemeConfig = {
  colors: {
    accent: '#72DDF7',
    progressLeft: '#F7AEF8',
    progressMiddle: '#F7AEF8',
    progressRight: '#F7AEF8',
    progressThumb: '#F4F4ED',
  },
};

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
  }),
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <LivepeerConfig theme={theme} client={livepeerClient}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />

          <Player
            autoPlay
            muted
            objectFit="contain"
            title="Part Two"
            aspectRatio="1to1"
            playbackId="bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy"
          />

          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LivepeerConfig>
  );
};

export default App;
