import {
  LivepeerConfig,
  Player,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const theme: ThemeConfig = {
  colors: {
    accent: '#ef44ef',
  },
};

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function App() {
  return (
    <LivepeerConfig theme={theme} client={livepeerClient}>
      <StatusBar style="auto" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>A Great Video</Text>
        <Player
          objectFit="contain"
          title="Part Two"
          poster={{
            uri: 'https://livepeerjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fblender-poster.6bbe6a8a.png&w=3840&q=75',
          }}
          aspectRatio="1to1"
          playbackId="bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy"
        />
        <Text style={styles.title}>This is just</Text>
        <Text style={styles.title}>some filler content to test</Text>
        <Text style={styles.title}>the player in a scroll view</Text>
        <Text style={styles.title}>successfully</Text>
      </ScrollView>
    </LivepeerConfig>
  );
}

const white = '#fff';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 12,
  },
});
