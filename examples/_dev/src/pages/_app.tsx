import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { WagmiConfig, createClient } from 'wagmi';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const wagmiClient = createClient(
  getDefaultClient({
    appName: 'livepeer.js dev',
    infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  }),
);

const App = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: string }>) => {
  return (
    <>
      <NextHead>
        <title>dev example - livepeer.js</title>
      </NextHead>

      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>
          <LivepeerConfig
            dehydratedState={pageProps?.dehydratedState}
            client={livepeerClient}
          >
            <Component {...pageProps} />
          </LivepeerConfig>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
