# @livepeer/react

## 0.2.2

### Patch Changes

- [#5](https://github.com/livepeer/livepeer.js/pull/5) [`97c56f6`](https://github.com/livepeer/livepeer.js/commit/97c56f64b18f62c6b417e35ac27834747b7a0c20) Thanks [@0xcadams](https://github.com/0xcadams)! - Updated the default studio API key to use a new, tracked (and rate-limited) version.

  ```diff
  -export const defaultStudioApiKey = '182188f3-3ddf-4dc2-9889-79ecb17a26c9';
  +export const defaultStudioApiKey = '4991930c-f9ae-46a0-a2a8-488c466da778';
  ```

  Updated the types on `CreateAssetArgs` to include `ReadStream` for node.js environments.

  ```diff
  export type CreateAssetArgs = {
    name: string;

  - file: File;
  + file: File | ReadStream;
    };
  ```

## 0.2.1

### Patch Changes

- [#3](https://github.com/livepeer/livepeer.js/pull/3) [`1c38dcd`](https://github.com/livepeer/livepeer.js/commit/1c38dcde2a7abce7a7785bcd6880ab6f71f0e0e4) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the term "LPMS" from the library and replaced a "LPMS Provider" with a "Livepeer Provider".

  See below for the API changes:

  ```diff
  - const lpmsProvider = useLPMSProvider<TLPMSProvider>();
  + const livepeerProvider = useLivepeerProvider<TLivepeerProvider>();
  ```

  ```diff
  - import { StudioLPMSProvider, studioProvider } from 'livepeer/providers/studio';
  + import {
  +   StudioLivepeerProvider,
  +   studioProvider,
  + } from 'livepeer/providers/studio';
  ```

- Updated dependencies [[`1c38dcd`](https://github.com/livepeer/livepeer.js/commit/1c38dcde2a7abce7a7785bcd6880ab6f71f0e0e4)]:
  - livepeer@0.2.1

## 0.2.0

### Minor Changes

- [#1](https://github.com/livepeer/livepeer.js/pull/1) [`6a8c1f5`](https://github.com/livepeer/livepeer.js/commit/6a8c1f59065533bbdb10bd73abca91e519370393) Thanks [@0xcadams](https://github.com/0xcadams)! - The `@livepeer/react` package is now comprised of three main groups:

  - **client:** the React-specific LPMS provider wrapped with `react-query` for query caching/persistence to storage
  - **context:** React Context for providing the client to React hooks
  - **hooks:** functions to write/read from Livepeer Media Server (LPMS) providers and the Livepeer protocol smart contracts

  ### Client

  ```diff
  + import { createReactClient } from '@livepeer/react';
  + import type { CreateReactClientConfig } from '@livepeer/react';
  ```

  ### Context

  ```diff
  + import { Context, LivepeerConfig, useClient } from '@livepeer/react';
  + import type { LivepeerConfigProps } from '@livepeer/react';
  ```

  ### Hooks

  ```diff
  + import {
  +   useAsset,
  +   useBondingManager,
  +   useController,
  +   useCreateAsset,
  +   useCreateStream,
  +   useL1Migrator,
  +   useL2Migrator,
  +   useLivepeerToken,
  +   useLivepeerTokenFaucet,
  +   useLPMSProvider,
  +   useMerkleSnapshot,
  +   useMinter,
  +   usePollCreator,
  +   useRoundsManager,
  +   useServiceRegistry,
  +   useStream,
  +   useStreamSession,
  +   useStreamSessions,
  +   useTicketBroker,
  +   useUpdateAsset,
  +   useUpdateStream,
  + } from '@livepeer/react';
  ```

### Patch Changes

- Updated dependencies [[`ebd1587`](https://github.com/livepeer/livepeer.js/commit/ebd15872cf7ac48a092ad88ea3a470a1c788e223)]:
  - livepeer@0.2.0
