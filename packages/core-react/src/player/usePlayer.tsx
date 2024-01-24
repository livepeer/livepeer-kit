// import {
//   ClipLength,
//   ControlsOptions,
//   MediaControllerCallbackState,
//   ObjectFit,
//   PlaybackError,
//   Src,
//   isAccessControlError,
//   isBframesError,
//   isNotAcceptableError,
//   isStreamOfflineError,
// } from "@livepeer/core";

import {
  Src,
  ClipLength,
  ControlsOptions,
  ObjectFit,
  PlaybackError,
  MediaControllerCallbackState,
} from "@livepeer/core";

// import * as React from "react";

// export type InternalPlayerProps = {
//   /** The current screen width. This is null if the screen size cannot be determined (SSR). */
//   _screenWidth: number | null;
// };

export type PlayerProps<TElement, TPoster, TSlice> = {
  /** The source(s) of the media (**required**) */
  src?: Src[] | string | string[] | null | undefined;

  /** The title of the media */
  title?: string;
  /** Shows/hides the title at the top of the media */
  showTitle?: boolean;

  /** Whether the media will loop when finished. Defaults to false. */
  loop?: boolean;

  /** Whether the player should play from a livestream's recording URL, if available. */
  playRecording?: boolean;

  /**
   * Poster image to show when the content is either loading (when autoplaying) or hasn't started yet (without autoplay).
   * It is highly recommended to also pass in a `title` attribute as well, for ARIA compatibility.
   */
  poster?: TPoster;
  /** Enables/disables the loading spinner */
  showLoadingSpinner?: boolean;
  /** Enables/disables the dStorage uploading indicator (text and progress percentage) */
  showUploadingIndicator?: boolean;

  // /** Callback when the clip button is triggered. */
  // onClipStarted?: () => Promise<any> | any;
  // /** Callback when a clip is created from the clip button. */
  // onClipCreated?: (asset: Asset) => Promise<any> | any;
  // /** Callback when a clip fails to be created from the clip button. */
  // onClipError?: (error: Error) => Promise<any> | any;

  /** Configuration for the event listeners */
  controls?: ControlsOptions;
  /**
   * Play media automatically when the content loads
   */
  autoPlay?: boolean;
  /** Mute media by default */
  muted?: boolean;

  /**
   * When true, the media will be considered high priority and preload. Lazy loading is automatically disabled for media using `priority`.
   * You should use the priority property on any media detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple, as different content may be the LCP element for different viewport sizes.
   *
   * Should only be used when the media is visible above the fold. Defaults to false.
   */
  priority?: boolean;
  /** If the element is currently shown on the DOM/screen. This should typically not be used by SDK users. */
  _isCurrentlyShown?: boolean;

  /** The object-fit property for the video element. Defaults to cover (contain is usually used in full-screen applications) */
  objectFit?: ObjectFit;

  /** Custom component to render when playback fails and is retrying */
  playbackFailedErrorComponent?: React.ReactNode;

  /** Custom component to render when the stream is offline */
  accessControlErrorComponent?: React.ReactNode;

  /** Custom component to render when the stream is offline */
  streamOfflineErrorComponent?: React.ReactNode;

  /** Custom controls passed in to override the default controls */
  children?: React.ReactNode;

  /** The refetch interval for the playback info hook (used with `playbackId` to query until there is a valid playback URL) */
  refetchPlaybackInfoInterval?: number;

  /**
   * If a decentralized identifier (an IPFS CID/URL) should automatically be uploaded as an Asset if playback info does not exist.
   * A custom gateway can also be specified, which is used to play back the asset directly from dStorage (only the domain needs to be passed, e.g. `https://ipfs.fleek.co`).
   *
   * Defaults to auto upload with fallback to play from dStorage until the asset is uploaded.
   */
  // autoUrlUpload?:
  //   | boolean
  //   | { fallback: true; ipfsGateway?: string; arweaveGateway?: string };

  /** The wallet ID of the user who is viewing the media. This is used to track viewership for specific wallet IDs. */
  viewerId?: string;

  /** The JWT which is passed along to allow playback of an asset. */
  jwt?: string;

  /** An access key to be used for playback. */
  accessKey?: string;

  /**
   * Whether the children should be rendered outside of the aspect ratio container.
   * This is used for custom controls, so children of the Player can use
   * `useMediaController` without any parent elements.
   */
  renderChildrenOutsideContainer?: boolean;

  /** Callback called when the stream status changes (live or offline) */
  onStreamStatusChange?: (isLive: boolean) => void;

  /** Callback called when the access control errors */
  onAccessControlError?: (error: Error) => void;

  /** Callback called when the media sources are changed */
  onSourceUpdated?: (sources: Src[]) => void;

  /** Callback called when there is a playback error */
  onPlaybackError?: (error: PlaybackError | null) => void;

  /** Callback called when an error occurs that is not access control or metrics */
  onError?: (error: Error) => void;

  /** Callback ref passed to the underlying media element. Simple refs are not supported, due to the use of HLS.js under the hood. */
  mediaElementRef?: React.RefCallback<TElement | null | undefined>;

  /** Callback called when the broadcast status updates. **This should be used with `playbackStatusSelector` to limit state updates.** */
  onPlaybackStatusUpdate?: (state: TSlice, previousState: TSlice) => any;
  /** Selector used with `onPlaybackStatusUpdate`. */
  playbackStatusSelector?: (state: MediaControllerCallbackState) => TSlice;
};

// export const usePlayer = <TElement, TPoster, TSlice>(
//   {
//     autoPlay,
//     children,
//     controls,
//     muted,

//     src,

//     title,
//     poster,
//     loop,

//     onStreamStatusChange,
//     onAccessControlError,
//     onError,
//     onSourceUpdated,
//     jwt,

//     clipLength,
//     // onClipCreated,
//     // onClipError,
//     // onClipStarted,

//     viewerId,

//     refetchPlaybackInfoInterval = 5000,
//     autoUrlUpload = true,

//     accessKey,

//     showLoadingSpinner = true,
//     showUploadingIndicator = true,
//     showTitle = true,
//     priority,

//     objectFit = "contain",
//     mediaElementRef,
//     _isCurrentlyShown,

//     playRecording,

//     onPlaybackStatusUpdate,
//     playbackStatusSelector,

//     playbackFailedErrorComponent,
//     streamOfflineErrorComponent,
//     accessControlErrorComponent,

//     onPlaybackError: onPlaybackErrorProp,

//     renderChildrenOutsideContainer,
//   }: PlayerProps<TElement, TPoster, TSlice>,
//   { _screenWidth }: InternalPlayerProps,
// ) => {
//   const [mediaElement, setMediaElement] = React.useState<TElement | null>(null);

//   // const sessionToken = React.useMemo(
//   //   () => generateRandomToken(),
//   //   [playbackInfo],
//   // );

//   // const source = useSourceMimeTyped({
//   //   src,
//   //   jwt,
//   //   refetchPlaybackInfoInterval,
//   //   screenWidth: _screenWidth,
//   //   accessKey,
//   //   playRecording,
//   //   sessionToken: "",
//   // });

//   const [playbackError, setPlaybackError] =
//     React.useState<PlaybackError | null>(null);

//   // const onPlaybackError = React.useCallback(
//   //   (error: Error | null) => {
//   //     setPlaybackError(newPlaybackError);

//   //     try {
//   //       if (newPlaybackError) {
//   //         console.log(newPlaybackError);
//   //       }

//   //       onPlaybackErrorProp?.(newPlaybackError);

//   //       if (!error) {
//   //         onStreamStatusChange?.(true);
//   //       } else if (newPlaybackError?.type === "offline") {
//   //         onStreamStatusChange?.(false);
//   //       } else if (newPlaybackError?.type === "access-control") {
//   //         onAccessControlError?.(new Error(newPlaybackError.message));
//   //       } else if (newPlaybackError?.message) {
//   //         onError?.(new Error(newPlaybackError.message));
//   //       }
//   //     } catch (e) {
//   //       console.error(e);
//   //     }

//   //     return newPlaybackError;
//   //   },

//   //   [onAccessControlError, onStreamStatusChange, onError, onPlaybackErrorProp],
//   // );

//   // React.useEffect(() => {
//   //   if (source) {
//   //     onSourceUpdated?.(source);
//   //     setPlaybackError(null);
//   //   }
//   // }, [source, onSourceUpdated]);

//   // if the source is priority or currently shown on the screen, then load
//   // const [hasBeenShown, setHasBeenShown] = React.useState(false);

//   // const loaded = React.useMemo(
//   //   () => priority || _isCurrentlyShown || hasBeenShown,
//   //   [priority, _isCurrentlyShown, hasBeenShown],
//   // );

//   // React.useEffect(() => {
//   //   if (_isCurrentlyShown && !hasBeenShown) {
//   //     setHasBeenShown(true);
//   //   }
//   // }, [_isCurrentlyShown, hasBeenShown]);

//   // const hidePosterOnPlayed = React.useMemo(
//   //   () =>
//   //     Array.isArray(source)
//   //       ? source?.[0]?.type !== 'audio'
//   //         ? true
//   //         : undefined
//   //       : undefined,
//   //   [source],
//   // );

//   // const sourceWithLoaded = React.useMemo(
//   //   () => (loaded ? source : null),
//   //   [loaded, source],
//   // );

//   return {
//     mediaElement,
//     source: sourceWithLoaded,
//   };
// };