import { expect, it } from 'vitest';

import * as Exports from './';

it('should expose correct exports', () => {
  expect(Object.keys(Exports).sort()).toMatchInlineSnapshot(`
    [
      "ACCESS_CONTROL_ERROR_MESSAGE",
      "AudioSourceSelect",
      "AudioToggle",
      "BFRAMES_ERROR_MESSAGE",
      "BaseSlider",
      "Broadcast",
      "BroadcastSettings",
      "Client",
      "Context",
      "ControlsContainer",
      "DEFAULT_AUTOHIDE_TIME",
      "DEFAULT_VOLUME_LEVEL",
      "FullscreenButton",
      "HttpError",
      "LivepeerConfig",
      "MediaControllerProvider",
      "NOT_ACCEPTABLE_ERROR_MESSAGE",
      "PictureInPictureButton",
      "PlayButton",
      "Player",
      "Poster",
      "Progress",
      "STREAM_OFFLINE_ERROR_MESSAGE",
      "STREAM_OPEN_ERROR_MESSAGE",
      "Screenshare",
      "StudioLivepeerProvider",
      "ThemeProvider",
      "TimeDisplay",
      "Title",
      "VideoSourceSelect",
      "VideoToggle",
      "Volume",
      "addMediaMetricsToStore",
      "aspectRatios",
      "b64Decode",
      "b64Encode",
      "b64UrlDecode",
      "b64UrlEncode",
      "clearClient",
      "createAsset",
      "createClient",
      "createControllerStore",
      "createReactClient",
      "createStorage",
      "createStream",
      "deepMerge",
      "defaultQueryClient",
      "defaultStudioConfig",
      "defaultTheme",
      "defaultTranscodingProfiles",
      "getAsset",
      "getAssetMetrics",
      "getCssText",
      "getLivepeerProvider",
      "getMediaSourceType",
      "getPlaybackInfo",
      "getStream",
      "getStreamSession",
      "getStreamSessions",
      "isAccessControlError",
      "isBframesError",
      "isNotAcceptableError",
      "isStreamOfflineError",
      "noopStorage",
      "omit",
      "pick",
      "prefetchAsset",
      "prefetchAssetMetrics",
      "prefetchPlaybackInfo",
      "prefetchPlayer",
      "prefetchStream",
      "prefetchStreamSession",
      "prefetchStreamSessions",
      "sanitizeMediaControllerState",
      "studioProvider",
      "styling",
      "updateAsset",
      "updateStream",
      "useAsset",
      "useAssetMetrics",
      "useClient",
      "useCreateAsset",
      "useCreateStream",
      "useLivepeerProvider",
      "useMediaController",
      "usePlaybackInfo",
      "useStream",
      "useStreamSession",
      "useStreamSessions",
      "useTheme",
      "useUpdateAsset",
      "useUpdateStream",
      "version",
      "watchLivepeerProvider",
    ]
  `);
});
