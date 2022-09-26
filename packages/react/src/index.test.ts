import { expect, it } from 'vitest';

import * as Exports from './';

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "allChainId",
      "arbitrumOneAddress",
      "arbitrumRinkebyAddress",
      "ArbRetryableTxABI",
      "BondingManagerABI",
      "canPlayMediaNatively",
      "Client",
      "ControllerABI",
      "createPlayerTheme",
      "createStorage",
      "defaultStudioApiKey",
      "defaultTheme",
      "defaultTranscodingProfiles",
      "getCssText",
      "getMediaSourceType",
      "InboxABI",
      "isHlsSupported",
      "L1BondingManagerABI",
      "L1MigratorABI",
      "L2LPTGatewayABI",
      "L2MigratorABI",
      "LivepeerTokenABI",
      "LivepeerTokenFaucetABI",
      "mainnetAddress",
      "mainnetChainId",
      "MerkleSnapshotABI",
      "MinterABI",
      "NodeInterfaceABI",
      "noopStorage",
      "PollABI",
      "PollCreatorABI",
      "rinkebyAddress",
      "RoundsManagerABI",
      "ServiceRegistryABI",
      "studio",
      "styling",
      "testnetChainId",
      "TicketBrokerABI",
      "studioProvider",
      "createReactClient",
      "ControlsContainer",
      "FullscreenButton",
      "MediaControllerProvider",
      "PlayButton",
      "Player",
      "Poster",
      "Progress",
      "ThemeProvider",
      "TimeDisplay",
      "Title",
      "useMediaController",
      "useTheme",
      "Volume",
      "Context",
      "LivepeerConfig",
      "useClient",
      "useAsset",
      "useAssetMetrics",
      "useBondingManager",
      "useController",
      "useCreateAsset",
      "useCreateStream",
      "useL1Migrator",
      "useL2Migrator",
      "useLivepeerProvider",
      "useLivepeerToken",
      "useLivepeerTokenFaucet",
      "useMerkleSnapshot",
      "useMinter",
      "usePollCreator",
      "useRoundsManager",
      "useServiceRegistry",
      "useStream",
      "useStreamSession",
      "useStreamSessions",
      "useTicketBroker",
      "useUpdateAsset",
      "useUpdateStream",
      "deserialize",
      "serialize",
    ]
  `);
});
